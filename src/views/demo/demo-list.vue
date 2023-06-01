<template>
  <div>
    <el-card>
      <el-form :model="searchForm" label-width="80px" class="mb-20">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="名称:">
              <el-input v-model="searchForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="类型:">
              <el-select v-model="searchForm.type" placeholder="请选择类型">
                <el-option label="类型1" value="shanghai"></el-option>
                <el-option label="类型2" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row type="flex" justify="end">
              <el-button type="primary" @click="handleCurrentChange(1)">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="mt-10">
      <h3>查询列表</h3>
      <el-row class="mt-10">
        <el-table :data="tableData" style="width: 100%" class="self-el-table">
          <el-table-column type="index" width="80" label="序号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="createDate" label="创建日期"></el-table-column>
          <el-table-column prop="address" label="操作" width="100" align="center">
            <template #default="scope">
              <el-button text @click="view(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row type="flex" justify="center" class="mt-10">
        <el-pagination
          :current-page="page.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import demo from '@/services/list';
import { ElMessage } from 'element-plus';
import { usePage } from '@/composables/use-page';

const searchForm = reactive({
  name: '',
  type: ''
});
const { tableData, page, handleCurrentChange, handleSizeChange, reset } = usePage({
  searchForm,
  getListApi: demo.queryList
});
reset();

const view = (row) => {
  ElMessage.success(JSON.stringify(row));
};
</script>
<style scoped>
/* Only comments */
</style>
