
const TEXT_CONTENT = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.";
const FILENAME = "lorem.txt";
//const PASSWORD = "1234578";

/* Create blob for each text files using Blob constructor */
const blob1 = new Blob([TEXT_CONTENT], { type: zip.getMimeType(FILENAME) });
const blob2 = new Blob([TEXT_CONTENT], { type: zip.getMimeType("aes.txt") });

/* Archive with password: accepts blob, content and filename of two files, and password_in */
async function archiveWithPass(blob1, content1, filename1, blob2, content2, filename2, password_in){
	zip.configure({ chunkSize: 128 });
	
	const blobWriter = new zip.BlobWriter("application/zip");
	const zipWriter = new zip.ZipWriter(blobWriter);
	
	await zipWriter.add(filename1, new zip.BlobReader(blob1), { password: password_in, zipCrypto: true });
	await zipWriter.add(filename2, new zip.BlobReader(blob2), { password: password_in, zipCrypto: true });

	/* create blobURL */	
	const blobURL = URL.createObjectURL(await zipWriter.close());

	return blobURL;
}

/* Sample usage */
archiveWithPass(blob1, TEXT_CONTENT, FILENAME, blob2, TEXT_CONTENT, "aes.txt", "12345678")
	.then( (blobURL) =>{
		var a = document.createElement("a");
		var link = document.createTextNode("Download sample zip file");
		a.appendChild(link);

		document.body.appendChild(a);
		a.href = blobURL;
        a.download = "test.zip"; //filename
        //a.click();
        //window.URL.revokeObjectURL(blobURL);
	})
	.catch(err => console.error(err));
