//actions
var jQT = new $.jQTouch({
	themeSelectionSelector: '#jqt'
});
$(function(){
	$('#archivos .individual li').tap(function(){
		if($(this).index()==0){
			leerArchivos();
			//$('#aLeer').text('hola 6');
		}else{
			escribirArchivos($('#aEscribir').val());
			//alert($('#aEscribir').val());
		}
		//alert($(this).index());
	});	
});

function escribirArhivos(texto){
	document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
        fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
        writer.onwriteend = function(evt) {
           navigator.notification.alert('Escrito Satisfatorio',null,'Escribir','Aceptar');
        };
        writer.write(texto);
    }

    function fail(error) {
        alert(error.code);
    }	
}

function leerArchivos(){
	document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
        fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(readAsText, fail);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            $('#aLeer').text(evt.target.result);
        };
     }

    function fail(evt) {
        alert(evt.target.error.code);
    }	
}