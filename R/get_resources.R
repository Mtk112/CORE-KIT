#' Get resource estimates
#'
#' Function gets resource estimates from rasters, location and radius inputs
#'
#' @param longlat vector of length two, longitude and latitude.
#' @param radius radius of the buffer used to
#'
#' @export
get_resources <- function(longlat,
                          radius) {

    wind <- raster::brick(system.file("extdata",package="corekit", "wind_potential.tif"))
    solar <- raster::brick(system.file("extdata",package="corekit", "solar_potential_kwhperkwp.tif"))

    radius <- units::set_units(radius, "km")

    buffer <- longlat %>%
        sf::st_point() %>%
        sf::st_sfc() %>%
        sf::st_set_crs(4326) %>%
        sf::st_transform(32646) %>%
        sf::st_buffer(radius) %>%
        sf::st_transform(4326) %>%
        sf::as_Spatial()

    wind_vals <- raster::extract(wind, buffer)
    wind_vals <- colMeans(wind_vals[[1]], na.rm = TRUE)

    solar_vals <- raster::extract(solar, buffer)
    solar_vals <- colMeans(solar_vals[[1]], na.rm = TRUE)

    output <- rbind(Wind = wind_vals, Solar = solar_vals)
    colnames(output) <- NULL
    return(output)
}
