import SearchBar from '../components/search/SearchBar.jsx'
import AirportMap from '../components/map/AirportMap.jsx'
import MetarCard from '../components/metar/MetarCard.jsx'
import SkeletonCard from '../components/shared/SkeletonCard.jsx'
import ErrorCard from '../components/shared/ErrorCard.jsx'
import EmptyState from '../components/shared/EmptyState.jsx'

export default function HomeTab({ metar, loading, error, icao, isFavorite, onToggleFavorite, onSearch }) {
  const isLoading = loading.metar
  const hasError = !!error.metar
  const hasData = !!metar

  return (
    <div className="space-y-3 pb-1">
      <SearchBar onSearch={onSearch} isLoading={isLoading} defaultValue={icao} />

      {/* Map */}
      {hasData && !isLoading && (
        <AirportMap
          lat={metar.lat}
          lon={metar.lon}
          icao={metar.icaoId}
          flightCategory={metar.flightCategory}
        />
      )}

      {/* Loading */}
      {isLoading && (
        <div className="px-4">
          <div className="h-52 rounded-2xl skeleton-shimmer mb-3" />
          <SkeletonCard />
        </div>
      )}

      {/* Error */}
      {hasError && !isLoading && (
        <div className="px-4">
          <ErrorCard errorCode={error.metar} onRetry={() => onSearch(icao)} />
        </div>
      )}

      {/* Empty state */}
      {!hasData && !isLoading && !hasError && (
        <EmptyState onSearch={onSearch} />
      )}

      {/* METAR data */}
      {hasData && !isLoading && (
        <MetarCard
          metar={metar}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  )
}
