package controller

import (
	"context"
	v1 "github.com/gogf/gf-demo-user/v2/api/v1"
	"github.com/gogf/gf-demo-user/v2/internal/service"
)

var Chatgpt = cChatgpt{}

type cChatgpt struct{}

func (c *cChatgpt) AskReq(ctx context.Context, req *v1.AskReq) (res *v1.AskRes, err error) {
	res, err = service.Openai().Ask(ctx, req)
	return
}

func (c *cChatgpt) AskReqWithStream(ctx context.Context, req *v1.AskWithStreamReq) (res *v1.AskWithStreamRes, err error) {
	res, err = service.Openai().AskWithStream(ctx, req)
	return
}

func (c *cChatgpt) GetPromptParamsReq(ctx context.Context, req *v1.GetPromptParamsReq) (res *v1.GetPromptParamsRes, err error) {
	res, err = service.Prompt().GetPromptById(ctx, req)
	return
}
