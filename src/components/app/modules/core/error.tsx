import { FC } from 'react'
import { MainWrapperUi } from '../../../../ui/block.ui'
import { FullSizeFlexUi } from '../../../../ui/flex.ui'
import { AlertHeaderUi, AlertUi } from '../../../../ui/alert.ui'
import { hasError, is404RoutingError, isError } from '../../../../utils/is'

const NotFound = ({ message }: { message?: string }) => (
  <>
    <AlertHeaderUi type="error">Page not found</AlertHeaderUi>
    {message || ''}
  </>
)

const OtherError = ({ error }: { error: Error }) => (
  <>
    <AlertHeaderUi type="error">{error.message}</AlertHeaderUi>
    <pre>{error.stack}</pre>
  </>
)

const CoreAppError: FC = () => {
  const err = {}

  return (
    <MainWrapperUi>
      <FullSizeFlexUi min center>
        <AlertUi type="error">
          {is404RoutingError(err) ? (
            <NotFound message={err.data} />
          ) : (
            <OtherError
              error={
                hasError(err) ? err.error : isError(err) ? err : new Error("Oops!!! Something went wrong. I couldn't determine the error.")
              }
            />
          )}
        </AlertUi>
      </FullSizeFlexUi>
    </MainWrapperUi>
  )
}

export { CoreAppError }
