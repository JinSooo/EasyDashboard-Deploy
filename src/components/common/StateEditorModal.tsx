import { CodeEditor } from '@/components/common/CodeEditor'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { JSExpression } from '@easy-editor/core'
import { observer } from 'mobx-react'
import { type PropsWithChildren, useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface StateEditorModalProps extends PropsWithChildren {
  open: boolean
  onConfirm?: (name: string, state: JSExpression) => void
  onClose?: () => void
  state?: JSExpression & {
    name: string
  }
}

export const StateEditorModal = observer((props: StateEditorModalProps) => {
  const { state, open, onConfirm, onClose, children } = props
  const [name, setName] = useState(state?.name)
  const [description, setDescription] = useState(state?.description)
  const [mock, setMock] = useState(state?.mock)
  const [code, setCode] = useState(state?.value)

  const isEdit = !!state?.name

  const handleConfirm = () => {
    if (!name) {
      toast.warning('请输入状态名称')
      return
    }

    if (!code) {
      toast.warning('请输入状态表达式')
      return
    }

    onConfirm?.(name, {
      ...state,
      type: 'JSExpression',
      value: code,
      description,
    })
    onClose?.()
  }

  useEffect(() => {
    if (state) {
      setName(state?.name)
      setDescription(state?.description)
      setCode(state?.value)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {children}
      <DialogContent className='!max-w-[1000px]'>
        <DialogHeader>
          <DialogTitle>状态{isEdit ? `编辑 - ${name}` : '新增'}</DialogTitle>
          <DialogDescription className='flex flex-col gap-4 h-[400px] mt-2'>
            <div className='flex items-center space-x-2'>
              <Label htmlFor='name' className='text-xs basis-15 text-right'>
                名称:
              </Label>
              <Input
                id='name'
                placeholder='请输入状态名称'
                className='h-8 !text-xs px-2 py-[5px]'
                value={name}
                onChange={e => setName(e.target.value)}
                // 如果状态名称已存在，则禁用输入
                disabled={isEdit}
              />
            </div>
            <div className='flex items-center space-x-2'>
              <Label htmlFor='description' className='text-xs basis-15 text-right'>
                描述:
              </Label>
              <Input
                id='description'
                placeholder='请输入状态描述'
                className='h-8 !text-xs px-2 py-[5px]'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className='flex items-center space-x-2'>
              <Label htmlFor='default' className='text-xs basis-15 text-right'>
                默认值:
              </Label>
              <Input
                id='default'
                placeholder='请输入状态默认值'
                className='h-8 !text-xs px-2 py-[5px]'
                value={mock}
                onChange={e => setMock(e.target.value)}
              />
            </div>
            <div className='flex space-x-2 flex-1'>
              <Label htmlFor='code' className='text-xs basis-15 text-right'>
                表达式:
              </Label>
              <CodeEditor language='javascript' value={code} onChange={e => setCode(e)} />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type='submit' onClick={handleConfirm} className='h-8 text-xs px-4 py-[5px]'>
            确定
          </Button>
          <Button variant='outline' onClick={onClose} className='h-8 text-xs px-4 py-[5px]'>
            取消
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})
