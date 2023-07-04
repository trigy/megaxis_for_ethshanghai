package controller

import (
	"context"
	v1 "github.com/gogf/gf-demo-user/v2/api/v1"
	"github.com/gogf/gf-demo-user/v2/internal/service"
)

var Tool = cTool{}

type cTool struct{}

func (c *cTool) GetToolByType(ctx context.Context, req *v1.GetToolByTypeReq) (res *v1.GetToolByTypeRes, err error) {
	res, err = service.Tool().GetToolByType(ctx, req)
	return
}

func (c *cTool) GetToolByKey(ctx context.Context, req *v1.GetToolByKeyReq) (res *v1.GetToolByKeyRes, err error) {
	res, err = service.Tool().GetToolByKey(ctx, req)
	return
}
