package v1

import (
	"github.com/gogf/gf-demo-user/v2/internal/model/entity"
	"github.com/gogf/gf/v2/frame/g"
)

type GetToolByTypeReq struct {
	g.Meta `path:"/tools/getByType" method:"post" tags:"ToolService" summary:"Get Tool By Type"`
	Type   int `json:"type" v:"required"`
	Offset int `json:"offset" v:"required"`
	Limit  int `json:"limit" v:"required"`
}

type ToolInfos []*entity.Tool
type GetToolByTypeRes struct {
	ToolInfos
	Total int `json:"total"`
}

type GetToolByKeyReq struct {
	g.Meta `path:"/tools/getByKey" method:"post" tags:"ToolService" summary:"Get Tool By Key"`
	Key    string `json:"key"`
	Offset int    `json:"offset" v:"required"`
	Limit  int    `json:"limit" v:"required"`
}

type GetToolByKeyRes struct {
	ToolInfos
	Total int `json:"total"`
}
