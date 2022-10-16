<template>
  <div>
    <el-card>
      <el-form :model="searchForm" label-width="80px" class="mb-20">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="名称:">
              <el-input
                v-model="searchForm.name"
                placeholder="请输入名称"
              ></el-input>
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
              <el-button type="primary" @click="search">查询</el-button>
              <el-button @click="getList">重置</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="mt-10">
      <h3>查询列表</h3>
      <el-row class="mt-10">
        <el-table :data="tableData" style="width: 100%" class="self-el-table">
          <el-table-column
            type="index"
            width="80"
            label="序号"
          ></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="createDate" label="创建日期"></el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="100"
            align="center"
          >
            <template #default="scope">
              <el-button text @click="view(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row type="flex" justify="center" class="mt-10">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import demo from '@/services/list';
import { ElMessage } from 'element-plus';

export default {
  name: 'list',
  setup() {
    const state = reactive({
      warehouseType: {},
      hiddenDangerDisposalStatus: {},
      searchForm: {
        name: '',
        type: ''
      },
      tableData: [],
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      }
    });
    const handleSizeChange = (size) => {
      state.page.pageSize = size;
    };
    const handleCurrentChange = (cur) => {
      state.page.pageNum = cur;
    };

    const getList = () => {
      demo.queryList().then((res) => {
        if (res.code === 0) {
          state.tableData = res.data.list;
          state.page.total = res.data.total;
        }
      });
    };
    onMounted(() => {
      getList();
    });

    const view = (row) => {
      ElMessage.success(JSON.stringify(row));
    };

    const search = () => {
      if (state.searchForm.name) {
        state.tableData = state.tableData.filter(
          (item) => item.name === state.searchForm.name
        );
      } else {
        getList();
      }
    };

    return {
      ...toRefs(state),
      handleSizeChange,
      handleCurrentChange,
      view,
      getList,
      search
    };
  }
};
</script>
<style scoped></style>
