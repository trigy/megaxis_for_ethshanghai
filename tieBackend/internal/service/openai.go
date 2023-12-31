// ================================================================================
// Code generated by GoFrame CLI tool. DO NOT EDIT.
// You can delete these comments if you wish manually maintain this interface file.
// ================================================================================

package service

import (
	"context"
	v1 "github.com/gogf/gf-demo-user/v2/api/v1"
)

type IOpenai interface {
	AskWithStream(context.Context, *v1.AskWithStreamReq) (*v1.AskWithStreamRes, error)
	Ask(context.Context, *v1.AskReq) (*v1.AskRes,error)
}

var localOpenai IOpenai

func Openai() IOpenai {
	if localOpenai == nil {
		panic("implement not found for interface localOpenai, forgot register?")
	}
	return localOpenai
}

func RegisterOpenai(i IOpenai)  {
	localOpenai = i
}