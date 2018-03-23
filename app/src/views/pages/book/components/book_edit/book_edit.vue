<template>
<div id="book_edit">
    <div class="main_c">
        <div style="width:800px;margin:0 auto;">
        <el-form ref="form" :model="book" label-width="80px">
            <el-form-item label="书名">
                <el-input v-model="book.book_title"></el-input>
            </el-form-item>
            <el-form-item label="价格">
                <el-input v-model="book.book_price"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="book.book_author"></el-input>
            </el-form-item>
            <el-form-item label="是否上架">
                <el-switch v-model="book.book_on_sale" active-value="0" inactive-value="1">
                </el-switch>
            </el-form-item>
            
            <el-form-item label="作品介绍">
                <el-input type="textarea" v-model="book.book_intro"></el-input>
            </el-form-item>

            <el-form-item label="头图">
                <el-upload
                action="/file/image-upload"
                list-type="picture-card"
                :on-success="handleHeadSuccess1"
                :file-list="book_imgs"
                :on-preview="handlePictureCardPreview1"
                :on-remove="handleRemove1" 
                :before-upload="beforeHeadUpload">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible1">
                <img width="100%" :src="dialogImageUrl1" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="介绍图">
                <el-upload
                action="/file/image-upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview2"
                :on-success="handleHeadSuccess2"
                :file-list="book_intro_imgs"
                :on-remove="handleRemove2" 
                :before-upload="beforeHeadUpload">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible2">
                <img width="100%" :src="dialogImageUrl2" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" v-if="!book.book_id" @click="onSubmit">立即创建</el-button>
                <el-button type="primary" v-if="book.book_id" @click="onSubmit">立即保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</div>
</template>
<script src="./book_edit.js"></script>
<style lang="less" src="./book_edit.less"></style>




