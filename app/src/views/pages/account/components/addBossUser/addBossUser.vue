<template>
<div id="addBossUser">
    <div class="breadcrumb-w">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item>添加后台用户</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    
    <div class="main_c">

    <div class="addBossUser_w">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.boss_user_name" type="text" placeholder="用户姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.tel" type="text" placeholder="用户手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="isDisabled" :loading="isSubmit" style="width:100%;" @click="addBossUser">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
        
    </div>

</div>
</template>
<script src="./addBossUser.js"></script>
<style lang="less" src="./addBossUser.less"></style>
