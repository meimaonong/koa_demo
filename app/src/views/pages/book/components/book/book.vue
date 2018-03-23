<template>
<div id="book">
    <div class="main_c">

        <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-button type="primary" @click="add" plain>添加书籍</el-button>
        </el-form-item>
        </el-form>

        <el-pagination
        v-show="list && pages"
        background
        style="padding-top:0;"
        layout="total, prev, pager, next"
        @current-change="pageChange"
        :current-page.sync="current_page"
        :page-count="pages"
        >
        </el-pagination>

        <el-table
        stripe
        border
        :data="list"
        style="width: 100%">
        <el-table-column
            prop="book_title"
            label="书名"
            width="180">
        </el-table-column>
        <el-table-column
            label="价格"
            width="180">
        <template slot-scope="scope">
        ￥{{scope.row.book_price}}
        </template>
        </el-table-column>
        <el-table-column
            prop="address"
            label="操作">
        <template slot-scope="scope">
        <el-button type="primary" plain size="small" @click="goEdit(scope.row.book_id)">编辑</el-button>
        </template>
        </el-table-column>
        </el-table>

        <el-pagination 
        v-show="list && pages"
        background
        layout="total, prev, pager, next"
        :current-page.sync="current_page"
        :page-count="pages"
        >
        </el-pagination>

    </div>
</div>
</template>
<script src="./book.js"></script>
<style lang="less" src="./book.less"></style>




