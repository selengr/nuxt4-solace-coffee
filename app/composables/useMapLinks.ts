export function useMapLinks() {
  const { info } = useCafe()

  const fullAddress = computed(() => `${info.address}, ${info.city}`)

  const query = computed(() => encodeURIComponent(fullAddress.value))

  const googleMapsUrl = computed(
    () => `https://www.google.com/maps/search/?api=1&query=${info.geo.lat}%2C${info.geo.lng}`,
  )

  const appleMapsUrl = computed(
    () => `https://maps.apple.com/?ll=${info.geo.lat},${info.geo.lng}&q=${query.value}`,
  )

  const geoUri = computed(
    () => `geo:${info.geo.lat},${info.geo.lng}?q=${query.value}`,
  )

  return {
    fullAddress,
    googleMapsUrl,
    appleMapsUrl,
    geoUri,
  }
}
