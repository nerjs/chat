import { FC, Suspense } from 'react'
import { FullSizeBlock } from '../../../../ui/block.ui'
import { Outlet } from 'react-router-dom'
import { FullSizeFlexUi } from '../../../../ui/flex.ui'
import { Sidebar } from '../../../sidebar'
import { Details } from '../../../details'

const MainAppLayout: FC = () => {
  return (
    <FullSizeFlexUi justifyContent="space-between" min>
      <Sidebar />
      <FullSizeBlock>
        <Suspense fallback={<>loading...</>}>
          <Outlet />
        </Suspense>
      </FullSizeBlock>
      <Details />
    </FullSizeFlexUi>
  )
}

export { MainAppLayout }
