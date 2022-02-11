<template>
  <Layout>
    <template #main>
      <section id="cd-timeline" class="cd-container">
        <template v-for="item in timeline">
          <div class="cd-timeline-box">
            <div class="cd-timeline-block" v-for="posts in item.posts">
              <div class="cd-timeline-img cd-picture" :style="{background:`#${posts.frontmatter.primary}`}"></div>

              <div class="cd-timeline-content" >
                <h2><a :href="`${posts.link}.html`">{{ posts.frontmatter.title }}</a></h2>
                <div class="timeline-content-info">
                  <span class="timeline-content-info-title">
                    <i class="fa fa-certificate" aria-hidden="true"></i>
                    {{posts.frontmatter.author}}
                  </span>
                  <span class="timeline-content-info-date">
                    <i class="fa fa-calendar-o" aria-hidden="true"></i>
                   {{posts.frontmatter.words}}字 /{{posts.frontmatter.readTime}}
                  </span>
                </div>
                <p class="timeline-content-summary">
                  {{ posts.frontmatter.summary }}
                </p>
                <ul class="content-skills">
                  <li v-for="tag in posts.frontmatter.tag">{{tag}}</li>
                </ul>
                <span class="cd-date">{{ posts.frontmatter.date }}</span>
              </div>
            </div>
          </div>
        </template>
      </section>
    </template>
  </Layout>
</template>
<script setup>
import Layout from "./Layout.vue";
const timeline = __POSTS__.timeline;
import {onMounted} from 'vue'
import gsap from 'gsap'
const handlerStagger = () => {
  import('gsap/ScrollTrigger').then((res)=>{
    gsap.registerPlugin(res.default);
    document.querySelectorAll(".cd-timeline-content").forEach((box) => {
    gsap.to(box, {
      scrollTrigger: {
        trigger: box,
        start: "bottom 100%+=200px",
        toggleActions: "restart",
      },
      y: 0,
      opacity: 1,
      duration: 1,
      scale: 1,
      ease: "Back.easeOut",
    });
  });
  })
  
};
onMounted(()=>{
  handlerStagger()
})
</script>
<style lang="scss">
.cd-container {
  width: 90%;
  max-width: 1080px;
  margin: 0 auto;
  /* background: var(--c-bg); */
  padding: 0 10%;
  border-radius: 2px;
}
.cd-container::after {
  content: "";
  display: table;
  clear: both;
}

/* -------------------------------- 

Main components 

-------------------------------- */

#cd-timeline {
  position: relative;
  padding: 2em 0;
  margin-top: 5em;
  margin-bottom: 2em;
}
#cd-timeline::before {
  content: "";
  position: absolute;
  top: 0;
  left: 25px;
  height: 100%;
  width: 2px;
  background: var(--c-brand);
}
.timeline-content-summary{
  word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
@media only screen and (min-width: 1170px) {
  #cd-timeline {
    margin-top: 3em;
    margin-bottom: 3em;
  }
  #cd-timeline::before {
    left: 50%;
    margin-left: -2px;
  }
}

.cd-timeline-block {
  position: relative;
  margin: 2em 0;
}
.cd-timeline-block:after {
  content: "";
  display: table;
  clear: both;
}
.cd-timeline-block:first-child {
  margin-top: 0;
}
/* .cd-timeline-block:last-child {
  margin-bottom: 0;
} */
@media only screen and (min-width: 1170px) {
  .cd-timeline-block {
    margin: 4em 0;
  }
  .cd-timeline-block:first-child {
    margin-top: 0;
  }
}

.cd-timeline-img {
  position: absolute;
  top: 8px;
  left: 21px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px var(--c-brand-light), inset 0 2px 0 rgb(0 0 0 / 8%),
    0 3px 0 4px rgb(0 0 0 / 5%);
}
.cd-timeline-img {
  background: var(--c-brand);
}
@media only screen and (min-width: 1170px) {
  .cd-timeline-img {
    width: 10px;
    height: 10px;
    left: 50%;
    margin-left: -6px;
    margin-top: 5px;
    -webkit-transform: translateZ(0);
    -webkit-backface-visibility: hidden;
  }
}

.cd-timeline-content {
  position: relative;
  margin-left: 60px;
  margin-right: 30px;
  background: var(--timeline-bg);
  border-radius: 2px;
  color: var(--text-color);
  padding: 1em;
  opacity: 0;
  transform: translateY(100px) scale(0.6);
  .timeline-content-info {
    background: rgba(0, 0, 0, 0.2);
    padding: 5px 10px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    display:flex;
    align-items: center;
    justify-content:space-between;
    i {
      margin-right: 5px;
    }
    .timeline-content-info-title,
    .timeline-content-info-date {
      width: calc(50% - 2px);
      display: inline-block;
      text-align:right;
    }
    .timeline-content-info-title{
      text-align:left;
      text-transform: capitalize;
    }
  }
  .content-skills {
    font-size: 12px;
    padding: 0;
    margin-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    li {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      display: inline-block;
      padding: 2px 10px;
      color: rgba(255, 255, 255, 0.7);
      margin: 3px 2px;
      text-align: center;
      /* flex-grow: 1; */
    }
  }
}
.cd-timeline-content:after {
  content: "";
  display: table;
  clear: both;
}
.cd-timeline-content h2 {
  margin-top: 0;
  margin-bottom: 5px;
}
.cd-timeline-content p,
.cd-timeline-content .cd-date {
  font-size: 13px;
  font-size: 0.8125rem;
}
.cd-timeline-content .cd-date {
  display: inline-block;
}
.cd-date{
  font-family:num;
  opacity:0.7;
}
.cd-timeline-content p {
  margin: 1em 0;
  line-height: 1.6;
}

.cd-timeline-content::before {
  content: "";
  position: absolute;
  top: 16px;
  right: 100%;
  height: 0;
  width: 0;
  border: 7px solid transparent;
  border-right: 7px solid var(--timeline-bg);
}

@media only screen and (min-width: 768px) {
  .cd-timeline-content h2 {
    font-size: 20px;
    font-size: 1.25rem;
  }
  .cd-timeline-content p {
    font-size: 16px;
    font-size: 1rem;
  }
  .cd-timeline-content .cd-read-more,
  .cd-timeline-content .cd-date {
    font-size: 14px;
    font-size: 0.875rem;
  }
}
@media only screen and (min-width: 1170px) {
  .cd-timeline-content {
    margin-left: 0;
    padding: 1.6em;
    width: 36%;
    margin: 0 5%;
  }
  .cd-timeline-content::before {
    top: 24px;
    left: 100%;
    border-color: transparent;
    border-left-color: var(--timeline-bg);
  }
  .cd-timeline-content .cd-date {
    position: absolute;
    width: 100%;
    left: 122%;
    top: 6px;
    font-size: 16px;
    font-size: 1rem;
  }
  .cd-timeline-box {
    padding-bottom: 40px;
  }
  .cd-timeline-box:nth-child(even) .cd-timeline-content {
    float: right;
  }
  .cd-timeline-box:nth-child(even) .cd-timeline-content::before {
    top: 24px;
    left: auto;
    right: 100%;
    border-color: transparent;
    border-right-color: var(--timeline-bg);
  }
  .cd-timeline-box:nth-child(even) .cd-timeline-content .cd-read-more {
    float: right;
  }
  .cd-timeline-box:nth-child(even) .cd-timeline-content .cd-date {
    left: auto;
    right: 122%;
    text-align: right;
  }
}
</style>
