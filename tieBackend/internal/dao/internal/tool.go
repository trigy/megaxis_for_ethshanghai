// ==========================================================================
// Code generated by GoFrame CLI tool. DO NOT EDIT.
// ==========================================================================

package internal

import (
	"context"

	"github.com/gogf/gf/v2/database/gdb"
	"github.com/gogf/gf/v2/frame/g"
)

// ToolDao is the data access object for table tool.
type ToolDao struct {
	table   string      // table is the underlying table name of the DAO.
	group   string      // group is the database configuration group name of current DAO.
	columns ToolColumns // columns contains all the column names of Table for convenient usage.
}

// ToolColumns defines and stores column names for table tool.
type ToolColumns struct {
	Id         string // pk
	Tid        string // Tool ID
	Name       string // Tool Name
	Desc       string // Description
	Price      string // Tool Price
	Url        string // Tool url
	Type       string // Tool Type
	Author     string // Tool Author
	Avatar     string // Tool 图片
	CreateTime string // Created Time
	UpdateTime string // Updated Time
}

// toolColumns holds the columns for table tool.
var toolColumns = ToolColumns{
	Id:         "id",
	Tid:        "tid",
	Name:       "name",
	Desc:       "desc",
	Price:      "price",
	Url:        "url",
	Type:       "type",
	Author:     "author",
	Avatar:     "avatar",
	CreateTime: "create_time",
	UpdateTime: "update_time",
}

// NewToolDao creates and returns a new DAO object for table data access.
func NewToolDao() *ToolDao {
	return &ToolDao{
		group:   "default",
		table:   "tool",
		columns: toolColumns,
	}
}

// DB retrieves and returns the underlying raw database management object of current DAO.
func (dao *ToolDao) DB() gdb.DB {
	return g.DB(dao.group)
}

// Table returns the table name of current dao.
func (dao *ToolDao) Table() string {
	return dao.table
}

// Columns returns all column names of current dao.
func (dao *ToolDao) Columns() ToolColumns {
	return dao.columns
}

// Group returns the configuration group name of database of current dao.
func (dao *ToolDao) Group() string {
	return dao.group
}

// Ctx creates and returns the Model for current DAO, It automatically sets the context for current operation.
func (dao *ToolDao) Ctx(ctx context.Context) *gdb.Model {
	return dao.DB().Model(dao.table).Safe().Ctx(ctx)
}

// Transaction wraps the transaction logic using function f.
// It rollbacks the transaction and returns the error from function f if it returns non-nil error.
// It commits the transaction and returns nil if function f returns nil.
//
// Note that, you should not Commit or Rollback the transaction in function f
// as it is automatically handled by this function.
func (dao *ToolDao) Transaction(ctx context.Context, f func(ctx context.Context, tx *gdb.TX) error) (err error) {
	return dao.Ctx(ctx).Transaction(ctx, f)
}