
var topicsLength = 0;
const topics = [];
const alt_questions = [];
const form = document.querySelector('form');
const topicSection = document.querySelector('.topics');

form.addEventListener('submit', handleForm);
const addTopic = (id) => {
    return `
<div class="form-row">
<h4>Topic ${id + 1}</h4>
    <div class="col-md-12 mb-3">
        <input type="text" class="form-control" name="topicName" id="topicName"  placeholder="Topic Name" required>
    </div>
</div>

<div class="add_Content_Fields">
    <h5><strong>Add Content <i class="fas fa-plus-circle icon content_Icon"></i></strong></h5>
<div class="contents contents${id}">
    <div class="content">
        <div class="form-row">
            <div class="col-md-12 mb-3">
                <label for="validationDefault02">Text</label>
                <input type="text" class="form-control" name="text" id="text" placeholder="Text" required>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6 mb-3">
              <label for="validationDefault03">text alt ( seperate by ';' )</label>
              <input type="text" class="form-control" name="textAlt" id="textAlt"  placeholder="textAlt" required>
            </div>
            <div class="col-md-6 mb-3">
              <label for="validationDefault04">Question</label>
              <input type="text" class="form-control" name="question" id="question" placeholder="Question" required>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6 mb-3">
            <div class="col-md-12 mb-3 Alt_Questions">
                <h5><strong>Alt Questions <i class="fas fa-plus-circle icon Alt_Questions_Icon"></i></strong></h5>
            </div>
        </div>
            <div class="col-md-6 mb-3">
                <label for="validationDefault05">Keywords</label>
                <input type="text" class="form-control" name="keywords" id="keywords" placeholder="Keywords" required>
            </div>
          </div>
    </div>
</div>
</div>
`;
}

const addContentTemplate = (id) => {
    return `
  <div class="form-row">
      <div class="col-md-12 mb-3">
          <label for="validationDefault02">Text</label>
          <input type="text" class="form-control" name="text" id="text" placeholder="Text" required>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="validationDefault03">text alt ( seperate by ';' )</label>
        <input type="text" class="form-control" name="textAlt" id="textAlt"  placeholder="textAlt" required>
      </div>
      <div class="col-md-6 mb-3">
        <label for="validationDefault04">Question</label>
        <input type="text" class="form-control" name="question" id="question" placeholder="Question" required>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6 mb-3">
          <div class="col-md-12 mb-3 Alt_Questions">
        <h5><strong>Alt Questions <i class="fas fa-plus-circle icon Alt_Questions_Icon"></i></strong></h5>
          </div>
      </div>
      <div class="col-md-6 mb-3">
          <label for="validationDefault05">Keywords</label>
          <input type="text" class="form-control" name="keywords" id="keywords" placeholder="Keywords" required>
      </div>
    </div>
`
}

const firstTopic = document.querySelector('.topic0');
console.log(firstTopic);

const firstContent = firstTopic.querySelector('.content');
const firstAlt_question = firstContent.querySelector('.Alt_Questions_Icon');
console.log(firstAlt_question);
firstAlt_question.addEventListener('click', () => {
    console.log('alt questions');
    const altDiv = document.createElement('div');
    altDiv.innerHTML = `
  <input type="text" class="form-control" name="alt_questions" id="alt_questions" placeholder="Alt Question" required>
  `;
    firstContent.querySelector('.Alt_Questions').appendChild(altDiv);
})

firstTopic.querySelector('.content_Icon').addEventListener('click', () => {
    console.log('adding in first topic');
    const content = addContentTemplate(topicsLength);
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content', `content${topicsLength}`);
    contentDiv.innerHTML = content;
    const topicContent = firstTopic.querySelector('.contents')
    topicContent.appendChild(contentDiv);

    console.log(contentDiv);
    const Alt_questionEvent = contentDiv.querySelector('.Alt_Questions_Icon');
    console.log(Alt_questionEvent);
    Alt_questionEvent.addEventListener('click', () => {
        const altDiv = document.createElement('div');
        altDiv.innerHTML = `
    <input type="text" class="form-control" name="alt_questions" id="alt_questions" placeholder="Alt Question" required>
    `;
        contentDiv.querySelector('.Alt_Questions').appendChild(altDiv);
    })

})


const addNewTopic = () => {
    topicsLength++;
    console.log(topicsLength);
    ;
    const topic = addTopic(topicsLength);
    const topicDiv = document.createElement('div');
    topicDiv.classList.add('topic', `topic${topicsLength}`)
    topicDiv.innerHTML = topic;
    topicSection.appendChild(topicDiv);

    console.log(topicDiv);

    topicDiv.querySelector('.content_Icon').addEventListener('click', () => {
        const content = addContentTemplate(topicsLength);
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content', `content${topicsLength}`);
        contentDiv.innerHTML = content;
        topicDiv.querySelector('.contents').appendChild(contentDiv);

        const Alt_questionEvent = contentDiv.querySelector('.Alt_Questions_Icon');
        console.log(Alt_questionEvent);

        Alt_questionEvent.addEventListener('click', () => {
            console.log('click')
            const altDiv = document.createElement('div');
            altDiv.innerHTML = `
      <input type="text" class="form-control" name="alt_questions" id="alt_questions" placeholder="Alt Question" required>
      `;
            contentDiv.querySelector('.Alt_Questions').appendChild(altDiv);
        })
    })

    const Alt_questionEvent = topicDiv.querySelector('.Alt_Questions_Icon');
    Alt_questionEvent.addEventListener('click', () => {
        const altDiv = document.createElement('div');
        altDiv.innerHTML = `
            <input type="text" class="form-control" name="alt_questions" placeholder="Alt Question" required>
        `;
        topicDiv.querySelector('.Alt_Questions').appendChild(altDiv);
    });

}

async function handleForm(e) {
    e.preventDefault();
    const val = e.target;

    const unitNumber = val.unitNumber.value;
    const unitName = val.unitName.value;
    const newTopic = val.topic?.value || '';
    const topicName = val.topicName.value;

    const topicsQuery = document.querySelectorAll('.topic');
    const jsonTopics = [];

    for (i = 0; i < topicsQuery.length; i++) {
        console.log(i);
        const topicName = topicsQuery[i].querySelector('#topicName').value;
        const topicContents = topicsQuery[i].querySelectorAll('.content');

        const JsonTopicContents = []

        for (j = 0; j < topicContents.length; j++) {

            var values = [];
            var text = topicContents[j].querySelector('#text');
            var textAlt = topicContents[j].querySelector('#textAlt');
            var question = topicContents[j].querySelector('#question');
            var keywords = topicContents[j].querySelector('#keywords');
            var fields = topicContents[j].querySelectorAll('#alt_questions');

            for (var k = 0; k < fields.length; k++) {
                values.push(fields[k].value);
            }

            JsonTopicContents[j] = {
                paragraph_id: j + 1,
                text: text.value,
                textAlt: textAlt.value.split(';'),
                question: question.value,
                altQuestions: values,
                keywords: keywords.value.split(';')
            }
        }
        topic = {topicNumber: i + 1, topicName, contents: JsonTopicContents};
        jsonTopics.push(topic);
    }
    const JSONobj = {
        unitNumber,
        unitName,
        topics: jsonTopics
    }

    console.log(JSONobj);
    try {
        const res = await fetch("http://localhost:8081/result", {
            method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(JSONobj), redirect: "follow"
        })
        window.location = res.url
    } catch (e) {
        console.log(e)
    }
}
