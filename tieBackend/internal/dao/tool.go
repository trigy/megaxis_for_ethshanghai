// =================================================================================
// This is auto-generated by GoFrame CLI tool only once. Fill this file as you wish.
// =================================================================================

package dao

import (
	"github.com/gogf/gf-demo-user/v2/internal/dao/internal"
)

// internalToolDao is internal type for wrapping internal DAO implements.
type internalToolDao = *internal.ToolDao

// toolDao is the data access object for table tool.
// You can define custom methods on it to extend its functionality as you wish.
type toolDao struct {
	internalToolDao
}

var (
	// Tool is globally public accessible object for table tool operations.
	Tool = toolDao{
		internal.NewToolDao(),
	}
)

// Fill with you ideas below.
