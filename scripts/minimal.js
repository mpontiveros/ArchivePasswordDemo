const TEXT_CONTENT = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.";
const FILENAME = "lorem.txt";
const PASSWORD = "12345678";
/* Call */

addFilesThenEncrypt(TEXT_CONTENT, TEXT_CONTENT, FILENAME, "aes.txt", PASSWORD)
    .then(uri => console.log(uri))
    .catch(err => console.error(err));

async function addFilesThenEncrypt(content1, content2, filename1, filename2, password_in){
    document.body.innerHTML = "...";

    zip.configure({chunksize: 128});
    /* Create a zipWriter and blobWriter */
    
    const blobWriter = new zip.BlobWriter("application/zip");
	const zipWriter = new zip.ZipWriter(blobWriter, { password: password_in, encryptionStrength: 3 });

    /* Create a blob for file 1 */
    const blob1 = new Blob([content1], { type: zip.getMimeType(filename1) });

    /* Create a blob for file 2 */
    const blob2 = new Blob([content2], { type: zip.getMimeType(filename2) });

    zipWriter.add( filename1, new zip.BlobReader( blob1 ));

    zipWriter.add( filename2, new zip.BlobReader( blob2 ));

    const dataURI = await zipWriter.close();

    // get the zip file as a Blob
    const blob = await blobWriter.getData();
    console.log(dataURI);
    /*
    if (TEXT_CONTENT == (await getBlobText(data)) && entries[0].filename == FILENAME && entries[0].uncompressedSize == TEXT_CONTENT.length) {
		document.body.innerHTML = "ok";
    }
    */


    

   return blob;
}

// eslint-disable-next-line no-unused-vars
async function logBlobText(blob) {
	console.log(await getBlobText(blob));
	console.log("--------------");
}

async function getBlobText(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = event => resolve(event.target.result);
		reader.onerror = () => reject(reader.error);
		reader.readAsText(blob);
	});
}