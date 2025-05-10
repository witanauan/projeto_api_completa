function carregarConteudo() {
    //consultar e exebir o conteudo de GET /inventarios
    $.ajax({
        url: "http://localhost:3000/inventarios",
        type: "GET",
        dataType: "json",
        success: function (dados) {
            $("#carregando").hide();
            dados.forEach(function (item) {
                $("#caixa_conteudo").append(`
                  <div class='cartoes'>
                     <b> N° <span id='codigo'>${item.codigo}</span> </b> <br>
                     Mesa: <span id='descricao'>${item.descricao}</span> <br>
                     Setor: <span id='setor'>${item.setor}</span> <br>
                     Categoria: <span id='categoria'>${item.categoria}</span>
                  </div> 
                `);
            });
        },
        error: function () {
            alert("Erro ao acessar GET/inventarios");
        }
    });// fecha ajax
}// fim da funçao

// o documentReady executa o codigo quando a pagina for aberta
$(document).ready(function () {
    carregarConteudo();
    $("#tela_escura").hide();
    $("#formulario_cadastro").hide();
    $("#formulario_editar").hide();
});

$("#btn_fechar_form_cad").click(function () {
    $("#tela_escura").hide();
});

$("#btn_cadastrar").click(function () {
    var codigo = $("#caixa_codigo").val();
    var descricao = $("#caixa_descricao").val();
    var categoria = $("#caixa_categoria").val();
    var setor = $("#caixa_setor").val();


    //POST para cadastrar itens
    $.ajax({
        url: "http://localhost:3000/inventarios",
        type: "POST",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify({ codigo, descricao, categoria, setor }),
        success: function (resposta) {
            alert(resposta.msg);
            $("#caixa_conteudo").html("");
            $("#carregando").show();
            $("#tela_escura").hide();
            $("#formulario_cadastro").hide();
        },
        error: function () {
            alert("falha ao acessar POST /inventarios");
        }
    });
});//fim do click no btn_cadastrar

$("#btn_mais").click(function () {
    $("#tela_escura").show();
    $("#formulario_cadastro").show();
});

$("#btn_pesquisar").click(function () {
    $("#caixa_conteudo").html("");
    $("#carregando").show();
    var codigo = $("#caixa_pesquisar").val();
    if(codigo == ""){
        alert("digite algo para pesquisar");
    }
    $.ajax({
        url: "http://localhost:3000/inventarios/" + codigo,
        type: "GET",
        dataType: "json",
        success: function (dados) {
            $("#carregando").hide();
                if (dados.length >= 1) {
                    $("#carregando").hide();
            dados.forEach(function (item) {
                $("#caixa_conteudo").append(`
                  <div class='cartoes'>
                     <b> N° <span id='codigo'>${item.codigo}</span> </b> <br>
                     Mesa: <span id='descricao'>${item.descricao}</span> <br>
                     Setor: <span id='setor'>${item.setor}</span> <br>
                     Categoria: <span id='categoria'>${item.categoria}</span>
                  </div> 
                `);;
                    });
                }
                else {
                    $("#caixa_conteudo").html("<h2> Nada encontrado 😕</h2>");
                }
            
        },
        error: function (){
            alert(" falha ao acessar GET/ inventarios/:codigo")
        }
    });

});//fim do click no btn_pesquisar

$(document).on("click",".cartoes", function(){
    $("#tela_escura").show();
    $("#formulario_editar").show();
});

$("#btn_fechar_form_editar").click(function(){
    $("#tela_escura").hide();
    $("#formulario_editar").show();
});