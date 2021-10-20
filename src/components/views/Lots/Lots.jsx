import React, { useEffect } from 'react'
import PrivateLayout from '../../shared/layouts/PrivateLayout/PrivateLayout'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../../shared/BreadCrumbs/BreadCrumbs'
import { useFetch } from 'use-http'
import { PageTitleSection } from '../../shared/styled/PageTitleSection'
import { ErrorLoaderWrapper } from '../../shared/ErrorLoaderWrapper/ErrorLoaderWrapper'
import { StyledCard } from '../../shared/styled/StyledCard'
import { StyledTitle } from '../../shared/styled/Typography'
import { LotRow } from './components/LotRow'
import { LotsGrid } from './styles'
import { SpacerH20 } from '../../shared/styled/Spacers'

export const Lots = () => {
  const PAGE_TITLE = 'Лоты'
  const API = 'get-items-lot.php '

  const { get, response, error, loading } = useFetch(API)

  useEffect(() => get(), [])

  const lots = response?.data?.lots || []

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection
            title={PAGE_TITLE}
          />

          <ErrorLoaderWrapper isError={!!error} isLoading={loading} isEmpty={!lots.length}>
            {
              lots.map(lot =>
                <StyledCard key={lot.lot_name}>

                  <StyledTitle>
                    {lot.lot_name}
                  </StyledTitle>
                  <SpacerH20 />

                  <LotsGrid>
                    {lot.items.map((lotItem, index) =>
                      <LotRow key={lotItem.serial_num} countNum={index + 1} {...lotItem} />
                    )}
                  </LotsGrid>

                </StyledCard>
              )
            }
          </ErrorLoaderWrapper>

        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}
