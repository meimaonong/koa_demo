<template>
<div id="reset">
    <div class="breadcrumb-w">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item>修改密码</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    
    <div class="main_c">

    <div class="reset_w">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="原密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.new_password" type="password" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.repeat_password" type="password" placeholder="重复新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="isDisabled" :loading="isSubmit" style="width:100%;" @click="reset">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
        
    </div>

</div>
</template>
<script src="./reset.js"></script>
<style lang="less" src="./reset.less"></style>
