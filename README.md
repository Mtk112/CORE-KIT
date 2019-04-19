# Visual-CORE

What is Visual-CORE?

Update later...



Installation

Step 1.

Download R (https://cran.r-project.org/bin/windows/base/).
Launch R and write "install.packages(c("opencpu","raster","dplyr","sf","units"), dependencies=TRUE)" in the console to install OpenCPU, and other dependencies.
Download Visual Code Studio (https://code.visualstudio.com/) or equivalent.
Install Live Server extension or equivalent. In VSC you can access extensions by hitting (Ctrl + Shift + X).

Step 2.

Clone or download the application from Github (https://github.com/Mtk112/Visual-CORE).

Step 3.

In R write "library(opencpu)" in the console.
Then write "ocpu_start_server()".
In VSC open /Visual-CORE/inst/www folder from the downloaded project.

Step 4.

Once Live Server or equivalent has been installed host the application locally.
With Live Server click the "Go Live" button, at the bottom middle of the screen.
Image: https://gyazo.com/2b27dada0af24e0e778a34593dba49ff

Pressing the "Go Live" button should launch the application on your browser.
You can also access the application by opening browser and going to "localhost:yourPortNumber". For example "localhost:5500".
  
  
