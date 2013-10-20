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
	$('#ncEnv').tap(function(){
		nuevoContacto($('#ncNom').val(),$('#ncTel').val(),$('#ncMail').val())
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
		reader.readAsText(file);
     }

    function fail(evt) {
        alert(evt.target.error.code);
    }	
}
function nuevoContacto(nombre,tel,mail){
	document.addEventListener("deviceready",function(){
		var contacto=navigator.contacts.create();
		contacto.displayname=nom;
		contacto.nickname=nom;
		var nombre=new ContactName();
		nombre.givenName=nombre;
		nombre.familyName="Prueba";
		contacto.name=nombre;
		var telefonos=[];
		telefonos[0]=new ContactField("home",tel,true);
		telefonos[1]=new ContactField("work",'123-234-2345',false);
		contacto.phoneNumber=telefonos;
		var correos=[];
		correos[0]=new ContactField("home",mail,false);
		correos[1]=new ContactField("work",'erika@e-indiga.com',true);
		contacto.emails=correos;
		contacto.save(function(){
			navigator.notification.alert("Contacto guardado Satisfactoriamente",function(){
					window.history.back();
				},"Crear Contacto","Aceptar");
			},function(err){
				alert(err.code);
				});
		},false);
}