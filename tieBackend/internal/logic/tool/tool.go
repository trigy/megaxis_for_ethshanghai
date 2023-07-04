package tool

import (
	"context"
	v1 "github.com/gogf/gf-demo-user/v2/api/v1"
	"github.com/gogf/gf-demo-user/v2/internal/dao"
	"github.com/gogf/gf-demo-user/v2/internal/model/entity"
	"github.com/gogf/gf-demo-user/v2/internal/service"
)

type (
	STool struct{}
)

func (S *STool) GetToolByType(ctx context.Context, in *v1.GetToolByTypeReq) (*v1.GetToolByTypeRes, error) {
	res := ([]*entity.Tool)(nil)
	if err := dao.Tool.Ctx(ctx).Where("type", in.Type).Limit(in.Offset, in.Limit).Scan(&res); err != nil {
		return nil, err
	}
	count, err := dao.Tool.Ctx(ctx).Where("type", in.Type).Count()
	if err != nil {
		return nil, err
	}
	return &v1.GetToolByTypeRes{
		ToolInfos: res,
		Total:     count,
	}, nil
}

func (S *STool) GetToolByKey(ctx context.Context, in *v1.GetToolByKeyReq) (*v1.GetToolByKeyRes, error) {
	res := ([]*entity.Tool)(nil)
	if err := dao.Tool.Ctx(ctx).WhereOrLike("name", "%"+in.Key+"%").WhereOrLike("desc", "%"+in.Key+"%").Limit(in.Offset, in.Limit).Scan(&res); err != nil {
		return nil, err
	}
	count, _ := dao.Tool.Ctx(ctx).WhereOrLike("name", "%"+in.Key+"%").WhereOrLike("desc", "%"+in.Key+"%").Count()
	return &v1.GetToolByKeyRes{
		ToolInfos: res,
		Total:     count,
	}, nil
}

func init() {
	service.RegisterTool(New())
}

func New() service.ITool {
	return &STool{}
}
