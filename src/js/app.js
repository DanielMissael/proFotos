document.addEventListener("DOMContentLoaded", ()=>{
    initApp();
})

const initApp=()=>{
    const request=indexedDB.open('imageDB',1)
    const contentImage=document.querySelector('.image-content-drag-drop')
    const chooseFile = document.querySelector('.btn')

    //instancia de db y creacion de columna
    request.onupgradeneeded = (e)=>{
        const db=e.target.result;
        db.creaObjectStore('images',{autoIncrement:true})
    }

    //carga de doc
    request.onsuccess = (e)=>{
        const db=e.target.result;
        contentImage.addEventListener('dragover',(e)=>{
            e.preventDefault();
        });

        contentImage.addEventListener('drop',(e)=>{
            e.preventDefault();
            const files=e.dataTransfer.files;
            handleFile(files,db)

        })

        chooseFile.addEventListener('change',(e)=>{
            const files=e.target.files;
            handleFile(files,db)
        })
    }
}

const handleFile=(files,db)=>{
    const main=document.querySelector('.main')
    loaderHTML(main)
}

const loaderHTML=(main)=>{
    clearHTML(main)
    main.style.height="143.57px";
    main.innerHTML +=`
    <h3>Uploadding</h3>
    <div class="loading">
        <div class="bar"></div>
    </div>
    `

    const loading=document.querySelector('.loading')

    if(loading){
        loading.classList.add('animated')
    }
}

const clearHTML=(HTML)=>{
    while(main.firstChild){
        main.removeChild(main.firstChild)
    }
}