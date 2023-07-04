package service

import (
	"context"

	v1 "github.com/gogf/gf-demo-user/v2/api/v1"
)

type ITool interface {
	GetToolByType(ctx context.Context, in *v1.GetToolByTypeReq) (*v1.GetToolByTypeRes, error)
	GetToolByKey(ctx context.Context, in *v1.GetToolByKeyReq) (*v1.GetToolByKeyRes, error)
}

var localTool ITool

func Tool() ITool {
	if localTool == nil {
		panic("implement not found for interface ITool, forgot register?")
	}
	return localTool
}

func RegisterTool(i ITool) {
	localTool = i
}
