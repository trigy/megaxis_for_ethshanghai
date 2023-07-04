package openai

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	v1 "github.com/gogf/gf-demo-user/v2/api/v1"
	"github.com/gogf/gf-demo-user/v2/internal/dao"
	"github.com/gogf/gf-demo-user/v2/internal/model/entity"
	"github.com/gogf/gf-demo-user/v2/internal/service"
	"github.com/gogf/gf/v2/frame/g"
	"log"
	"net/http"
	"os/exec"
	"path/filepath"
	"regexp"
	"runtime"
	"strings"
)

func init() {
	service.RegisterOpenai(New())
}

func New() service.IOpenai {
	return &SOpenai{}
}

type (
	SOpenai struct{}
)

func (s *SOpenai) Ask(ctx context.Context, in *v1.AskReq) (*v1.AskRes, error) {
	defer func() {
		temp1, _ := json.Marshal(in)
		log.Printf("Ask receive req:%v", string(temp1))
	}()
	userPrompt, err := buildPromptFromReq(ctx, in.Data)
	if err != nil {
		log.Printf("buildPromptFromReq error:%v", err)
		return nil, err
	}

	res, err := callOpenAI(ctx, userPrompt)
	if err != nil {
		log.Printf("callOpenAI err:%v", err)
		return nil, err
	}
	return &v1.AskRes{
		Data: res,
	}, nil
}

func (s *SOpenai) AskWithStream(ctx context.Context, in *v1.AskWithStreamReq) (*v1.AskWithStreamRes, error) {
	defer func() {
		temp, _ := json.Marshal(in)
		log.Printf("AskWithStreaming receive req:%v", string(temp))
	}()

	userPrompt, err := buildPromptFromReq(ctx, in.Data)
	if err != nil {
		log.Printf("buildPromptFromReq error:%v", err)
		return nil, err
	}

	streamChannel := make(chan string)
	if err := callOpenAIByStream(ctx, userPrompt, streamChannel); err != nil {
		log.Printf("callOpenAIByStream error:%v", err)
		return nil, err
	}

	// 获取ghttp.Request
	gReq := g.RequestFromCtx(ctx)
	rw := gReq.Response.RawWriter()
	flusher, ok := rw.(http.Flusher)
	if !ok {
		http.Error(rw, "Streaming unsupported!", http.StatusInternalServerError)
		return nil, nil
	}
	gReq.Response.Header().Set("Content-Type", "text/event-stream")
	gReq.Response.Header().Set("Cache-Control", "no-cache")
	gReq.Response.Header().Set("Connection", "keep-alive")
	flusher.Flush()
	// 传输开始
	for item := range streamChannel {
		fmt.Fprintf(rw, "%v\n\n", item)
		flusher.Flush()
	}

	return nil, nil

}

func buildPromptFromReq(ctx context.Context, askData []*v1.AskData) ([]string, error) {
	if len(askData) == 0 {
		return nil, nil
	}
	pidList := make([]string, 0)
	for _, item := range askData {
		if item.DataType != v1.PromptAsk {
			continue
		}
		pidList = append(pidList, item.Pid)
	}
	promptModelMap := make(map[string]*entity.Prompt)
	if len(pidList) != 0 {
		var err error
		//pid, _ := strconv.ParseInt(in.Pid, 10, 64)
		promptModelMap, err = dao.Prompt.GetPromptByIdList(ctx, pidList)
		if err != nil {
			return nil, err
		}
	}
	userPrompt := buildAllPrompt(askData, promptModelMap)
	if len(userPrompt) == 0 {
		return nil, errors.New("userPrompt len is 0")
	}
	log.Printf("userprompt:%v", userPrompt)
	return userPrompt, nil
}

func buildAllPrompt(oriData []*v1.AskData, promptDataMap map[string]*entity.Prompt) []string {
	res := make([]string, 0)
	for _, item := range oriData {
		switch item.DataType {
		case v1.Answer, v1.ContentAsk:
			res = append(res, item.Content)
		case v1.PromptAsk:
			promptData, ok := promptDataMap[item.Pid]
			if !ok {
				log.Printf("buildAllPrompt promptId not found:%v", item.Pid)
				continue
			}
			res = append(res, fillParamsToContent(item.Params, promptData.Content))
		}
	}
	return res
}

func fillParamsToContent(params []string, content string) string {
	for i := 0; i < len(params); i++ {
		content = fillBlank(content, params[i])
	}
	return content
}

func fillBlank(str, replacement string) string {
	indexStart := strings.Index(str, "{")
	indexEnd := strings.Index(str, "}")
	if indexStart == -1 || indexEnd == -1 || indexStart >= indexEnd {
		return str
	}
	return str[:indexStart] + replacement + str[indexEnd+1:]
}

func fillBlankRegex(input string, replacement string) string {
	regex := regexp.MustCompile(`{[^}]*}`)
	result := regex.ReplaceAllString(input, replacement)
	return result
}

func callOpenAI(ctx context.Context, prompt []string) (string, error) {
	if len(prompt) == 0 {
		return "", errors.New("empty prompt")
	}
	// 第三个参数整体是一个参数，不会因为中间有空格而变成多个参数
	path, err := getCurrentFilePath()
	if err != nil {
		log.Printf("callOpenAI error:%v", err)
		return "", err
	}
	scriptPath := filepath.Dir(path) + "/openai_api.py"
	cmd := exec.Command("python3", append([]string{scriptPath}, prompt...)...)
	log.Println(cmd.String())
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("callOpenAI error:%v", err)
		return "", err
	}
	return string(out), nil
}

type newWriter struct {
	stream chan string
}

func (w *newWriter) Write(p []byte) (n int, err error) {
	w.stream <- string(p)
	return len(p), nil
}

func callOpenAIByStream(ctx context.Context, prompt []string, stream chan string) error {
	if stream == nil {
		return errors.New("stream channel is nil")
	}
	if len(prompt) == 0 {
		return errors.New("prompt list len is 0")
	}
	path, err := getCurrentFilePath()
	if err != nil {
		log.Printf("callOpenAIByStream error:%v", err)
		return err
	}
	scriptPath := filepath.Dir(path) + "/openai_api_v2.py"

	cmd := exec.Command("python3", append([]string{scriptPath}, prompt...)...)
	log.Println(cmd.String())

	w := newWriter{stream: stream}
	cmd.Stdout = &w
	go func() {
		if err := cmd.Start(); err != nil {
			log.Printf("callOpenAIByStream cmd.Start() error:%v", err)
		}
		if err := cmd.Wait(); err != nil {
			log.Printf("callOpenAIByStream cmd.Wait() error:%v", err)
		}
		close(stream)
	}()

	return nil
}

func getCurrentFilePath() (string, error) {
	_, filename, _, ok := runtime.Caller(1)
	if !ok {
		return "", fmt.Errorf("failed to get current file path")
	}
	return filepath.Abs(filename)
}
