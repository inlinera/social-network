import { LoadingUI } from '@/shared/ui/loading'
import { useTranslation } from 'react-i18next'

export const PageLoad = () => {
  const { t } = useTranslation()

  return <LoadingUI>{t('page_load')}</LoadingUI>
}
