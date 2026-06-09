import {courses} from "./data.js";

const coursesElement = document.querySelector('.catalog__list')

const categoryLabels = {
    marketing: 'Marketing',
    management: 'Management',
    hr: 'HR & Recruting',
    design: 'Design',
    development: 'Development'
};


const renderCoursesList = (data) => {

    if (data.length === 0) {
        return '<p class="catalog__empty-message">No courses found</p>'
    }

    return data.map(course => `
      <div class="course-card">
        <img class="course-card__image" src="./images/${course.image}" alt="${course.title}">
        
        <div class="course-card__content">
          <div class="course-card__badge course-card__badge--${course.category}">${categoryLabels[course.category]}</div>
          <h2 class="course-card__title">${course.title}</h2>
    
          <p class="course-card__info">
            <span class="course-card__price">$${course.price}</span>
            <span class="course-card__author">${course.author}</span>
          </p>
        </div>
      </div>
    `).join('');
}

coursesElement.innerHTML = renderCoursesList(courses);

const tabs = document.querySelectorAll('.catalog__tab')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(tab => tab.classList.remove('catalog__tab--active'))
        tab.classList.add('catalog__tab--active')
        const category = tab.dataset.category;

        const filteredCourses = category === 'all' ? courses : courses.filter(course => course.category === category)
        coursesElement.innerHTML = renderCoursesList(filteredCourses);
    })
})

const searchInput = document.querySelector('.catalog__search-input')

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.currentTarget.value.toLowerCase()
    const foundCourses = courses.filter(course => course.title.toLowerCase().includes(searchTerm))
    coursesElement.innerHTML = renderCoursesList(foundCourses);
})