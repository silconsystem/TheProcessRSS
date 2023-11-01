// URL of the XML document
const xmlUrl = 'https://binauralsubliminal.com/album_msp/getrssfeed.php';

let count = 0;

function updateCounter(direction) {
  
  let nextCount;
  let previousCount;
  
  if (direction === "right") {
    if (count >= 5) {
      count = 0;
      count++;
    } else {
      count++;
    }
  } else if (direction === "left") {
    if (count <= 0) {
      count = 5;
      count--;
    } else {
      count--;
    }
  } else if (!direction || direction === "") {
    count = 0;
  }
  nextCount = (count + 1) % 6;
  previousCount = (count + 5) % 6;
  console.log(`updateCounter:\n
                current count: ${count}\n
                next count: ${nextCount}\n
                previous count: ${previousCount}`);
                
  return {
    currentCount: count,
    nextCount: nextCount,
    previousCount: previousCount
  }
}

let counter = updateCounter();
//let currentIndex = counter.currentCount;
//let nextIndex = counter.nextCount;
//let previousIndex = counter.previousCount;

// declaring variables for app background field
const appBgImgElements = document.querySelectorAll('.app__bg__image');

// declare variables for header
const appHeader = document.querySelector('.appHeader');
const appHeaderContainer = document.querySelector('.appHeaderContainer');
const appHeaderImg = appHeader.querySelector('img');
const appHeaderAuthor = appHeader.querySelector('.appHeader_author');
const appHeaderTitle = appHeaderContainer.querySelector('.appHeader_title');
const appHeaderDescription = appHeaderContainer.querySelector('.appHeader_description');

// declaring variables for card elements
const card = document.querySelectorAll('.card');

const cardTitle = document.querySelectorAll('.text.location');
const cardDescription = document.querySelectorAll('.text.description');
const cardImage = document.querySelectorAll('.card__image > img');

// declaring variables for infolist elements
const info_list = document.querySelectorAll('.info');
/**
// test output                                -------- TODO_!! CLEANUP
console.log(card);
console.log(cardTitle);
console.log(cardDescription);
console.log(cardImage);
**/
let pubDateList = [];
let audioList = [];
let imageList = [];
let titleList = [];
let titleDescription = [];
//let videoUrls = [];
let modifiedDescriptions = [];
const regex = /https:\/\/youtu.be\/([^\s?]+)/g;
// fetch feed
function fetchRSSFeed() {
  // Fetch the XML document
  fetch(xmlUrl)
    .then(response => response.text())
    .then(data => {
      // Parse the XML document
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');

      const channel = xmlDoc.querySelector('channel');
      const channelAuthor = channel.querySelector('author').textContent;
      const channelTitle = channel.querySelector('title').textContent;
      const channelDescription = channel.querySelector('description').textContent;
      const channelLink = channel.querySelector('link').textContent;
      //const channelWebMaster = channel.querySelector('webMaster').textContent;
      const channelImage = channel.querySelector('image').getAttribute('href');

      const channelItems = channel.querySelectorAll('item');
      /**
      console.log(`channelAuthor: ${channelAuthor}`);
      console.log(`channelTitle: ${channelTitle[0]}`);
      console.log(`channelDescription: ${channelDescription}`);
      console.log(`channelLink: ${channelLink}`);
      console.log(`channelImage: ${channelImage}`);
      **/
      for (i = 0; i < channelItems.length; i++) {

        if (i >= channelItems.length) {
          i = 0;
        }


        const item = channelItems[i];

        const itemPubDate = item.querySelector('pubDate').textContent;
        const itemTitle = item.querySelector('title').textContent;
        const itemEnclosure = item.querySelector('enclosure').getAttribute('url');
        const itemDescription = item.querySelector('description').textContent;
        const itemImgUrl = item.querySelector('image').getAttribute('href');
        
        let modifiedDescription = itemDescription.replace(regex, 'https://www.youtube.com/embed/$1');
        modifiedDescriptions.push(modifiedDescription);

        /**
        console.log(`itemPubDate: ${itemPubDate}`);
        console.log(`itemTitle: ${itemTitle}`);
        console.log(`itemEnclosure: ${itemEnclosure}`);
        console.log(`itemDescription: ${itemDescription}`);
        console.log(`itemImgUrl: ${itemImgUrl}`);
        **/
        pubDateList.push(itemPubDate);
        titleList.push(itemTitle);
        audioList.push(itemEnclosure);
        titleDescription.push(itemDescription);
        //titleDescriptionUrl.push(itemDescriptionUrl);
        imageList.push(itemImgUrl);
      }
      var description_list = channelDescription.split(/\d+\.\s/).filter(function(list_item) {
        return list_item !== "";
      });
      
      var desc_formatted = description_list.map(function (list_item, index) {
        return (index+1) + ". " + list_item.trim() + "<br>";
      }).join("");
      
      appHeaderImg.src = channelImage;
      console.log(channelImage);
      appHeaderAuthor.textContent = channelAuthor;
      appHeaderTitle.textContent = channelTitle;
      appHeaderDescription.innerHTML = desc_formatted;
      /**
      const startIndex = {
        currentCount: 0,
        nextCount: 1,
        previousCount: 5
      }

      appBgCurrentImg.src = imageList[count];
      appBgNextImg.src = imageList[count + 1];
      appBgPrevImg.src = imageList[count + 4];
        **/  
      createAppBgImg(appBgImgElements, counter);
      createCard(card, counter);
      createCardInfo(info_list, counter);
    }).catch(error => {
      console.error('Error fetching or parsing XML:', error);
      console.log(error);
    });
}
fetchRSSFeed();
/**
  
**/
console.log(`modifiedDescriptions: ${modifiedDescriptions}`);

function createAppBgImg(appBgElList, index) {
    
  let current = index.currentCount;
  let next = index.nextCount;
  let previous = index.previousCount;
  
  appBgElList.forEach(function(appBg_class) {
    
    if (appBg_class.classList.contains('current--image')) {
      
      const appBgCurrent = document.querySelector('.app__bg__image.current--image');
      const appBgCurrentImg = appBgCurrent.querySelector('img');
       
      appBgCurrentImg.src = imageList[current];
      console.log(`current app background: ${imageList[current]}\ncounter: ${current}`);
    } else if (appBg_class.classList.contains('next--image')) {
      
      const appBgNext = document.querySelector('.app__bg__image.next--image');
      const appBgNextImg = appBgNext.querySelector('img');
     
      appBgNextImg.src = imageList[next];
      console.log(`next app background: ${imageList[next]}\ncounter: ${next}`);
    } else if (appBg_class.classList.contains('previous--image')) {
      
      const appBgPrev = document.querySelector('.app__bg__image.previous--image');
      const appBgPrevImg = appBgPrev.querySelector('img');
      
      appBgPrevImg.src = imageList[previous];
      console.log(`previous app background: ${imageList[previous]}\ncounter: ${previous}`);
    } else {
      
      console.log('app background class not found');
    }
  });
}

function createCard(cardArray, index) {
  
  let current = index.currentCount;
  let next = index.nextCount;
  let previous = index.previousCount;
  console.log(`card index:\ncurrent: ${current}\nnext: ${next}\nprevious: ${previous}`);
  
  // get card elements and parse class text and urls
  cardArray.forEach(function(card_class) {
    if (card_class.classList.contains('current--card')) {
      
      const cardImg = card_class.querySelector('.card__image > img');
      cardImg.src = imageList[current];
      //appBgCurrentImg.src = imageList[current];
      //createAppBgImg(imageList, counter);
      
      console.log('class is: current--card');
      console.log(`img count position: ${current}`);
    } else if (card_class.classList.contains('next--card')) {
      
      const cardImg = card_class.querySelector('.card__image > img');
      cardImg.src = imageList[next];
      //appBgNextImg.src = imageList[next];
      //createAppBgImg(imageList, counter);
      
      console.log('class is: next--card');
      console.log(`img count position: ${next}`);
    } else if (card_class.classList.contains('previous--card')) {
      
      const cardImg = card_class.querySelector('.card__image > img');
      cardImg.src = imageList[previous];
      //appBgPrevImg.src = imageList[previous];
      //createAppBgImg(imageList, counter);
      
      console.log('class is: previous--card');
      console.log(`img count position: ${previous}`);
    } else {
      console.log('class is: not found');
    }
  });
}

function createCardInfo(infoArray, index) {
  // get info elements and parse info class text
  infoArray.forEach(function(info_class) {
    
    let current = index.currentCount;
    let next = index.nextCount;
    let previous = index.previousCount;
    console.log(`info index:\ncurrent: ${current}\nnext: ${next}\nprevious: ${previous}`);
    
    if (info_class.classList.contains('current--info')) {
      const author = info_class.querySelector('h1');
      const title = info_class.querySelector('h4');
      const desc = info_class.querySelector('p');
      author.textContent = 'Binaural Sub';
      title.textContent = titleList[current];
      //desc.innerHTML = `<a class="card-video" style="z-index: 10;" href="${titleDescription[current]}">Video project ${current}</a>`;
      
      author.classList.add('rippleFx');
      title.classList.add('rippleFx');
      //desc.classList.add('rippleFx');
      
      console.log(`class is: current--info`);
      console.log(author);
      console.log(`info count position: ${current}`);
    } else if (info_class.classList.contains('next--info')) {
      const author = info_class.querySelector('h1');
      const title = info_class.querySelector('h4');
      const desc = info_class.querySelector('p');
      author.textContent = 'Binaural Sub';
      title.textContent = titleList[next];
      //desc.innerHTML = `<a class="card-video" style="z-index: 10;" href="${titleDescription[next]}">Video project ${next}</a>`;
      
      author.classList.add('rippleFx');
      title.classList.add('rippleFx');
      //desc.classList.add('rippleFx');
      
      console.log(`class is: next--info`);
      console.log(`info count position: ${next}`);
    } else if (info_class.classList.contains('previous--info')) {
      const author = info_class.querySelector('h1');
      const title = info_class.querySelector('h4');
      const desc = info_class.querySelector('p');
      title.textContent = titleList[previous];
      //desc.innerHTML = `<a class="card-video" style="z-index: 10;" href="${titleDescription[previous]}">Video project ${previous}</a>`;
      author.textContent = 'Binaural Sub';
      
      author.classList.add('rippleFx');
      title.classList.add('rippleFx');
      //desc.classList.add('rippleFx');
      
      console.log(`class is: previous--info`);
      console.log(`info count position: ${previous}`);
    }
  });
}

appHeaderImg.addEventListener("click", function() {
  appHeaderImg.classList.toggle('enlarged');
  appHeaderImg.classList.toggle('glowing-text');
});