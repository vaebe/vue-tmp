import type { FormInstance } from 'element-plus'
import type { ResultData } from '@/api/base'
import type { AnyObject, PaginationParameter } from '@/types'
import { dataClone, resetObjToPrimitiveType } from '@/utils/tool'

interface PageOptions {
  searchForm?: AnyObject
  getListApi: (params: any) => Promise<AnyObject>
  removeRowApi?: (params: any) => Promise<AnyObject>
  customQueryParameters?: () => Record<string, any>
  resetFunc?: () => void
  sizeChangeFunc?: () => void
  currentChangeFunc?: () => void
}

// 列表
export function usePageList(opts: PageOptions) {
  const {
    searchForm = {},
    getListApi,
    removeRowApi,
    customQueryParameters = () => ({}),
    resetFunc,
    sizeChangeFunc,
    currentChangeFunc,
  } = opts

  const page = reactive<PaginationParameter>({
    pageSize: 10,
    pageNo: 1,
    total: 0,
  })

  // 获取列表loading
  const listLoading = ref(false)

  const tableData = ref<any[]>([])

  function getList() {
    listLoading.value = true

    const params = {
      ...page,
      ...searchForm,
      ...customQueryParameters(),
    }

    getListApi(params)
      .then((res) => {
        if (res.code === 0) {
          const data = res.data || {}
          tableData.value = data?.list || []
          page.total = data?.total || 0
        }
      })
      .catch(() => {
        // code -1 拦截器当错误返回
        tableData.value = []
        page.total = 0
      })
      .finally(() => {
        listLoading.value = false
      })
  }

  function handleSizeChange(pageSize: number) {
    page.pageSize = pageSize
    sizeChangeFunc?.()
    getList()
  }

  function handleCurrentChange(pageNo: number) {
    page.pageNo = pageNo
    currentChangeFunc?.()
    getList()
  }

  function reset() {
    Object.assign(searchForm, resetObjToPrimitiveType(searchForm))
    resetFunc?.()
    handleCurrentChange(1)
  }

  // 删除
  function removeRow(params: any, infoText?: string, delSuccessInfo?: string) {
    if (!removeRowApi) {
      ElMessage.warning('请配置 removeRowApi 调用')
      return
    }

    ElMessageBox.confirm(
      infoText ?? '此操作将永久删除该数据, 是否继续?',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
      .then(async () => {
        const res = await removeRowApi?.(params)
        if (res?.code === 0) {
          ElMessage.success(delSuccessInfo ?? '删除成功')
          handleCurrentChange(1)
        }
      })
  }

  return {
    listLoading,
    reset,
    page,
    tableData,
    handleSizeChange,
    handleCurrentChange,
    removeRow,
  }
}

// 弹窗类型
export type DialogType = 'add' | 'edit' | 'view'

const DialogTypeObj = {
  add: '新增',
  edit: '编辑',
  view: '查看',
}

interface PageListDialogOpts {
  saveForm: AnyObject // 保存的数据
  openDialogFunc?: (row: AnyObject) => void // 弹窗打开的后的执行的逻辑
  saveApi?: (opts: any) => Promise<ResultData<any>> // 保存接口
  updateApi?: (opts: any) => Promise<ResultData<any>> // 编辑接口 只有新增无需传递
  beforeSaveFunc?: () => Promise<boolean> // 保存接口调用前调用返回布尔，false 则取消保存
  saveSuccessFunc?: () => void // 保存成功后执行的逻辑
}

// 列表弹窗
export function usePageListDialog(opts: PageListDialogOpts) {
  const {
    saveForm = {},
    openDialogFunc,
    saveApi,
    updateApi,
    saveSuccessFunc,
    beforeSaveFunc,
  } = opts

  const dialogType = ref<DialogType>('add')

  const dialogTitle = computed(() => DialogTypeObj[dialogType.value])

  const dialogIsView = computed(() => dialogType.value === 'view')

  const dialogVisible = ref(false)
  const dialogFormRef = ref<FormInstance>()

  async function openDialog(type: DialogType = 'add', data?: AnyObject) {
    if (type !== 'add' && !data) {
      console.error('openDialog 函数type类型不等于 add 时 data 必传')
      return
    }

    dialogType.value = type
    if (type === 'add') {
      Object.assign(saveForm, resetObjToPrimitiveType(saveForm))
    }
    else {
      Object.assign(saveForm, dataClone(data ?? {}))
    }

    dialogVisible.value = true

    await nextTick()

    dialogFormRef.value?.clearValidate()
    openDialogFunc?.(dataClone(data ?? {}))
  }

  function save() {
    dialogFormRef.value?.validate(async (valid): Promise<void> => {
      if (valid) {
        // beforeSaveFunc 存在且返回 false 不继续进行
        if (beforeSaveFunc && !(await beforeSaveFunc()))
          return

        const opts = dataClone(saveForm)

        const res
          = dialogType.value === 'add'
            ? await saveApi?.(opts)
            : await updateApi?.(opts)

        if (res?.code === 0) {
          saveSuccessFunc?.()

          ElMessage.success('操作成功')
          dialogVisible.value = false
        }
      }
      else {
        ElMessage.warning('信息不完整，请检查必填项内容！')
      }
    })
  }

  return {
    dialogType,
    openDialog,
    dialogIsView,
    dialogTitle,
    dialogVisible,
    dialogFormRef,
    save,
  }
}
