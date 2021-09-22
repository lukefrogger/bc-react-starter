export const getBanners = async ({ res, config }) => {
  const banners = await config.storeApiFetch(`/v2/banners`, {
    headers: {
      Accept: 'application/json',
    },
  })
  return res.status(200).json(banners)
}
