function About() {
    return(
       <div className="flex justify-between h-screen">
            <div className="p-12 pr-0">
                <h1 className="text-3xl font-black pb-5">About us</h1>
                <p className="w-full pb-3">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type 
                    specimen book. It has survived not only five centuries, but also the leap into electronic 
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s with 
                    he release of Letraset sheets containing Lorem Ipsum passages, and more recently 
                    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p className="w-full pb-3">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type 
                    specimen book. It has survived not only five centuries, but also the leap into electronic 
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s with 
                    he release of Letraset sheets containing Lorem Ipsum passages, and more recently 
                    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
         <div className="h-96 w-full bg-cover bg-center border-4 border-black m-4 p-16"
         style={{backgroundImage: (`url("/img/fundo.png")`)}}
         ></div>
       </div>     
    )
}

export default About




