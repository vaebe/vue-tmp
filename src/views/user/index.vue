<script lang="ts" setup>
import { getUserList, removeUser } from '@/api/user.ts'

const AddAndViewDialog = defineAsyncComponent(
  () => import('./components/AddAndViewDialog.vue'),
)

const searchForm = reactive({
  nickName: '',
  email: '',
  wxId: '',
})

const { reset, page, tableData, handleCurrentChange, removeRow } = usePageList({
  searchForm,
  getListApi: getUserList,
  removeRowApi: removeUser,
})
reset()

const { roleEnums, accountTypeEnums, getEnumName } = useEnums()

const addAndViewDialogRef = ref()
function openAddAndViewDialog(type: string, row?: any) {
  addAndViewDialogRef.value.openDialog(type, row)
}
</script>

<template>
  <el-card class="mb-2" :body-style="{ paddingBottom: '2px' }">
    <el-form :model="searchForm" label-width="90px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="邮箱：">
            <el-input v-model="searchForm.email" placeholder="请输入邮箱" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="昵称：">
            <el-input v-model="searchForm.nickName" placeholder="请输入昵称" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button @click="reset">
              重置
            </el-button>
            <el-button type="primary" @click="handleCurrentChange(1)">
              查询
            </el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </el-card>

  <el-card>
    <div class="flex items-center justify-between">
      <span class="text-title">{{ $route.meta.title }}</span>
      <el-button @click="openAddAndViewDialog('add')">
        新增
      </el-button>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" class="my-2">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column label="头像" prop="avatar" min-width="80">
        <template #default="scope">
          <el-image :src="scope.row.avatar" class="w-10 h-10" :lazy="true" />
        </template>
      </el-table-column>
      <el-table-column label="账号类型" prop="accountType" min-width="100">
        <template #default="{ row }">
          {{ getEnumName({ key: row.accountType, list: accountTypeEnums }) }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" min-width="180" />
      <el-table-column label="昵称" prop="nickName" min-width="180" />
      <el-table-column label="角色" prop="role" min-width="100">
        <template #default="{ row }">
          {{ getEnumName({ key: row.role, list: roleEnums }) }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createdAt" width="180" />
      <el-table-column label="操作" width="160" fixed="right" align="center">
        <template #default="scope">
          <el-button type="primary" link @click="openAddAndViewDialog('view', scope.row)">
            查看
          </el-button>
          <el-button type="warning" link @click="openAddAndViewDialog('edit', scope.row)">
            修改
          </el-button>
          <el-button type="danger" link @click="removeRow({ id: scope.row.id })">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      hide-on-single-page
      :current-page="page.pageNo"
      :page-size="page.pageSize"
      layout="total,prev, pager, next,jumper"
      :total="page.total"
      @current-change="handleCurrentChange"
    />
  </el-card>

  <AddAndViewDialog ref="addAndViewDialogRef" @refresh-data="reset" />
</template>

<style lang="scss" scoped></style>
