# CORE-KIT

What is CORE-KIT?

Update later...



Installation

Download and install R. https://lib.ugent.be/CRAN/ Download and install RStudio. https://www.rstudio.com/products/rstudio/download/ Clone the project from https://github.com/Mtk112/CORE-KIT

Open RStudio and navigate to the CORE-KIT folder and click on corekit.Rproj (bottom right area in RStudio). Next write the following line in RStudio's console to install dependencies (console is the big text area in RStudio). install.packages(c("opencpu","raster","dplyr","sf","units"), dependencies=TRUE)

After RStudio has finished installing requirements, click on "Build" in the toolbar at top. Click on "Install and Build".

Then write the following lines to the console: library(opencpu) ocpu_start_server()

Then download and install Visual Studio Code, or equivalent. https://code.visualstudio.com/ Install Live Server extension or equivalent. In VSC you can access extensions by hitting (Ctrl + Shift + X). In VSC open /CORE-KIT/inst/www folder from the downloaded project.

Pressing the "Go Live" button should launch the application on your browser. You can also access the application by opening browser and going to "localhost:yourPortNumber". For example "localhost:5500".
