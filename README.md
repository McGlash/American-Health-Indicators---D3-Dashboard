# D3 Challenge - American Health Indicators 

![7-animated-scatter](Images/7-animated-scatter.gif)

I created an interactive graph using D3 to visualize health risk indicators relative the demographics of Americans.

Deployed >  https://mcglash.github.io/D3-Challenge/

The data set used based on 2014 ACS 1-year estimates: [https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml). The current data set incldes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."


## Approach
![4-scatter](Images/4-scatter.jpg)

I created a scatter plot between data variables such as `Healthcare vs. Poverty` and `Smokers vs. Age`.

The graphic is coded in the `app.js` file which pulls in the data from `data.csv`. 

* Note: If you are launching the code from your local, You'll need to use `python -m http.server` to run the visualization. This will host the page at `localhost:8000` in your web browser.

- - -

### Why make a static graphic when D3 lets you interact with your data?

The scatterplot includes multiple demographics and risk factors. Additional labels are included in the scatter plot. Users can click on the axes labels to call events enabling then to decide which data to display. The transtions between views are animated. 

The scatterplot also included a tooltip to enable users to view the number when hovering over different points. 

![8-tooltip](Images/8-tooltip.gif)
