(async function () {

    const $container = document.getElementById('container'),
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

    async function renderDataTable(arrData) {
        $tbody.innerHTML = '';

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



})();
