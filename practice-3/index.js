(async function () {

    const $container = document.getElementById('container'),
    
    $search = document.createElement('input'),

    $table = document.createElement('table'),
    $thead = document.createElement('thead'),
    $trHead = document.createElement('tr'),
    $thHeadId = document.createElement('th'),
    $thHeadUserId = document.createElement('th'),
    $thHeadTitle = document.createElement('th'),
    $thHeadBody = document.createElement('th'),
    $tbody = document.createElement('tbody');

    $thHeadId.textContent = 'id';
    $thHeadUserId.textContent = 'userId';
    $thHeadTitle.textContent = 'title';
    $thHeadBody.textContent = 'body';
    $search.setAttribute('placeholder', 'Введите запрос');

    $container.append($search);
    $container.append($table);
    $table.append($thead);
    $thead.append($trHead);
    $trHead.append($thHeadId);
    $trHead.append($thHeadUserId);
    $trHead.append($thHeadTitle);
    $trHead.append($thHeadBody);
    $table.append($tbody);

    let dataList = [];

    async function loadData() {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        if (response.ok) {
            let data = await response.json();
            return data;
        } else {
            alert("Ошибка HTTP: " + response.status);
        };
    }

    let sortColumn = '',
    sortDir = true;

    async function renderDataTable(arrData) {
        $tbody.innerHTML = '';

        arrData.sort(function (a, b) {
            let sort = a[sortColumn] < b[sortColumn]
            if (sortDir === false) sort = a[sortColumn] > b[sortColumn]
            return sort ? -1 : 1
          })

        //cоздаем строку 
        for (let user of arrData) {

            const $line = document.createElement('tr'),
                $IdTd = document.createElement('td'),
                $UserIdTd = document.createElement('td'),
                $TitleTd = document.createElement('td'),
                $BodyTd = document.createElement('td');

            $IdTd.classList.add('td-id');
            $UserIdTd.classList.add('td-id');

            $IdTd.textContent = user.id;
            $UserIdTd.textContent = user.userId;
            $TitleTd.textContent = user.title;
            $BodyTd.textContent = user.body;

            $tbody.append($line);
            $line.append($IdTd);
            $line.append($UserIdTd);
            $line.append($TitleTd);
            $line.append($BodyTd);
        }
    }

    dataList = await loadData();
    renderDataTable(dataList);

//сортировка
    $thHeadId.addEventListener('click', function (event) {
        event.preventDefault();
        sortColumn = 'id';
        renderDataTable(dataList);
        sortDir = !sortDir;
      })

      $thHeadUserId.addEventListener('click', function (event) {
        event.preventDefault();
        sortColumn = 'userId';
        renderDataTable(dataList);
        sortDir = !sortDir;
      })

      $thHeadTitle.addEventListener('click', function (event) {
        event.preventDefault();
        sortColumn = 'title';
        renderDataTable(dataList);
        sortDir = !sortDir;
      })

      $thHeadBody.addEventListener('click', function (event) {
        event.preventDefault();
        sortColumn = 'body';
        renderDataTable(dataList);
        sortDir = !sortDir;
      })

      //фильтрация
      $search.addEventListener('input', function () {
        let dataListNew=[];
        if ($search.value.length>2){
    for(let i = 0; i < dataList.length; i++) {
        if(dataList[i].id.toString().includes($search.value)||dataList[i].userId.toString().includes($search.value)||dataList[i].title.toString().includes($search.value)||dataList[i].body.toString().includes($search.value)) {
          dataListNew.push(dataList[i]);
        }
      }
    renderDataTable(dataListNew);
        }   
      })

})();
