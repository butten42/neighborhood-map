# Neighborhood Map Project 

![Part of the Udacity Front-End Web Development Nanodegree](https://img.shields.io/badge/Udacity-Front--End%20Web%20Developer%20Nanodegree-02b3e4.svg)

> This is the **Udacity Neighborhood Map Project**. It's intended as a challenge to put together a website from various APIs.  🔰

### Get Start
#### Make a style
The view have three parts:
- navbar
- asidelist
- map window

could be a simple one but...
#### Get the function 
1. need to show the markers in the map  
2. need to show the marker's details while onclick
3. need to show the list of locations in asidelist box
4. while we click the entry in the location box the marker will center and show it's infowindow
5. search/fliter the locations hide the unlikes
6. ~~in the begining can choose the source~~ (baidu sucks! changed by a weatehr forecast)
7. responsiveness

### What's the problem and how to overcome
**The google map loaded somehow override my navbar and asidelist or just disappear in the window**
> It;s very embarrass that I try many time finally understand it need to have a `absolute` in map's position and the `relative` attribute in others.  

**Uncaught ReferenceError: google is not defined**
> Change the order of script would work (sometimes)

 **How to find the placeid**
> at this [URL](https://developers.google.com/places/place-id?hl=zh-cn) it says we can search the placeid but actually useless.  
you need put the search url in your browser and manually get the placeid `https://maps.googleapis.com/maps/api/place/textsearch/json?query=jinfen+in+ShenZhen&key=YOURKEY`  
tedious ha?

**How to get the place details**
> [Here](https://developers.google.com/places/web-service/details) helps.  
you have two way to get the details:`service.getDetails`  `service.textSearch`  
`https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY`

**But when I just want to use the getDetails in google api the 'google is not defined' error occurs**
> yes I don't know why and finally just mamully add the infomaition into the model

**Add the trigger at the list**
> add the marker into the model and use the `google.maps.event.trigger(elem.marker, "click");`

**make the filter works**
> it works by use bind the visible into the model and in the html we put a `data-bind="textInput: query"` in the textbox.for each view we put a match,use the `ko.utils.arrayFilter` to get the match,
the indexof to find the one who is match.

**the other api**
> I was going to use another map api called baidu but faced tons of hard things so I decide just use an weather api,and I can't use most of Chinese company's api for the policy in china so I use the openweather api

**the CROS**
> I just use the jquery ajax to get the json but return an `Uncaught SyntaxError: Unexpected token:`
due to the callback wants to return a function but it just return a json.but if I just use the json instead of jsonp,I get a CROS

> change an API
### Done
* the feature
* the function
* third party API
### Used Libs
- Knockout
- jQuery
### Used APIs
- Google map
- openweather



