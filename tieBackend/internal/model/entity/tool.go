// =================================================================================
// Code generated by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package entity

import (
	"github.com/gogf/gf/v2/os/gtime"
)

// Tool is the golang structure for table tool.
type Tool struct {
	Id         uint        `json:"id"         description:"pk"`
	Tid        string      `json:"tid"        description:"Tool ID"`
	Name       string      `json:"name"       description:"Tool Name"`
	Desc       string      `json:"desc"       description:"Description"`
	Price      float64     `json:"price"      description:"Tool Price"`
	Url        string      `json:"url"        description:"Tool url"`
	Type       uint        `json:"type"       description:"Tool Type"`
	Author     string      `json:"author"     description:"Tool Author"`
	Avatar     string      `json:"avatar"     description:"Tool 图片"`
	CreateTime *gtime.Time `json:"createTime" description:"Created Time"`
	UpdateTime *gtime.Time `json:"updateTime" description:"Updated Time"`
}
