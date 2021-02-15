var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    },

    onDeviceReady: function () {
        this.receivedEvent('deviceready')
        document.getElementById("status").innerHTML = "loading......"
        document.getElementById("status").style.backgroundColor = "grey"
        var DocumentReaderResults = DocumentReader.DocumentReaderResults
        var DocumentReaderScenario = DocumentReader.DocumentReaderScenario
        var Enum = DocumentReader.Enum
        var doRfid = false
        var isReadingRfid = false
        var rfidUIHeader = "Reading RFID"
        var rfidUIHeaderColor = "black"
        var rfidDescription = "Place your phone on top of the NFC tag"
        var rfidProgress = -1
        document.getElementById("rfidUI").style.display = isReadingRfid ? "" : "none"
        document.getElementById("mainUI").style.display = !isReadingRfid ? "" : "none"
        document.getElementById("rfidUIHeader").innerHTML = rfidUIHeader
        document.getElementById("rfidUIHeader").style.color = rfidUIHeaderColor
        document.getElementById("rfidDescription").innerHTML = rfidDescription
        document.getElementById("rfidProgress").value = rfidProgress
        document.getElementById("cancelButton").addEventListener("click", stopRfid)

        function postInitialize(scenarios, canRfid) {
            for (var index in scenarios) {
                var input = document.createElement("input")
                input.type = "radio"
                input.name = "scenario"
                input.value = DocumentReaderScenario.fromJson(typeof scenarios[index] === "string" ? JSON.parse(scenarios[index]) : scenarios[index]).name
                if (index == 0)
                    input.checked = true
                input.onclick = function () { DocumentReader.setConfig({ processParams: { scenario: this.value } }, function (m) { }, function (e) { }) }
                input.style.display = "inline-block"
                document.getElementById("scenariosRadioGroup").appendChild(input)
                var label = document.createElement("span")
                label.innerHTML = DocumentReaderScenario.fromJson(typeof scenarios[index] === "string" ? JSON.parse(scenarios[index]) : scenarios[index]).name
                label.style.display = "inline-block"
                label.style.width = "200px"
                label.radioButton = input
                label.onclick = function () { this.radioButton.click() }
                document.getElementById("scenariosRadioGroup").appendChild(label)
                document.getElementById("scenariosRadioGroup").appendChild(document.createElement("br"))
            }
            if (canRfid) {
                document.getElementById("rfidCheckbox").disabled = false
                document.getElementById("rfidCheckboxText").style.color = "black"
                document.getElementById("rfidCheckboxText").innerHTML = "Process rfid reading"
                document.getElementById("rfidCheckboxText").onclick = function () { document.getElementById("rfidCheckbox").click() }
                document.getElementById("rfidCheckbox").onchange = function () { doRfid = this.checked }
            }
        }

        function scan() {
            DocumentReader.showScanner(function (m) {
                handleCompletion(DocumentReader.DocumentReaderCompletion.fromJson(JSON.parse(m)))
            }, function (e) { })
        }

        function recognizeAndroid() {
            var permissions = cordova.plugins.permissions
            permissions.checkPermission(permissions.READ_EXTERNAL_STORAGE, function (status) {
                if (status.hasPermission)
                    recognize()
                else {
                    permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, function success(status) {
                        if (status.hasPermission)
                            recognize()
                    }, function error() {
                        console.warn('READ_EXTERNAL_STORAGE permission denied')
                    })
                }
            })
        }

        function stopRfid() {
            hideRfidUI()
            DocumentReader.stopRFIDReader(function (e) { }, function (e) { })
        }

        function recognize() {
            window.imagePicker.getPictures(function (results) {
                if (results.length > 0) {
                    clearResults()
                    document.getElementById("status").innerHTML = "copying image......"
                    document.getElementById("status").style.backgroundColor = "grey"
                }
                var images = []
                for (var index in results)
                    readFile(results[index], function (base64) {
                        document.getElementById("status").innerHTML = "processing image......"
                        document.getElementById("status").style.backgroundColor = "grey"
                        images.push(base64)
                        if (images.length === results.length)
                            DocumentReader.recognizeImages(images, function (m) { handleCompletion(DocumentReader.DocumentReaderCompletion.fromJson(JSON.parse(m))) }, function (e) { })
                    })
            }, function (e) { }, { maximumImagesCount: 10 })
        }

        function handleCompletion(completion) {
            if (isReadingRfid && (completion.action === Enum.DocReaderAction.CANCEL || completion.action === Enum.DocReaderAction.ERROR))
                hideRfidUI()
            if (isReadingRfid && completion.action === Enum.DocReaderAction.NOTIFICATION)
                updateRfidUI(completion.results.documentReaderNotification)
            if (completion.action === Enum.DocReaderAction.COMPLETE)
                if (isReadingRfid)
                    if (completion.results.rfidResult !== 1)
                        restartRfidUI()
                    else {
                        hideRfidUI()
                        displayResults(completion.results)
                    }
                else
                    handleResults(completion.results)
        }

        function showRfidUI() {
            // show animation
            isReadingRfid = true
            document.getElementById("rfidUI").style.display = isReadingRfid ? "" : "none"
            document.getElementById("mainUI").style.display = !isReadingRfid ? "" : "none"
        }

        function hideRfidUI() {
            // show animation
            restartRfidUI()
            isReadingRfid = false
            document.getElementById("rfidUI").style.display = isReadingRfid ? "" : "none"
            document.getElementById("mainUI").style.display = !isReadingRfid ? "" : "none"
            rfidUIHeader = "Reading RFID"
            document.getElementById("rfidUIHeader").innerHTML = rfidUIHeader
            rfidUIHeaderColor = "black"
            document.getElementById("rfidUIHeader").style.color = rfidUIHeaderColor
        }

        function restartRfidUI() {
            rfidUIHeaderColor = "red"
            document.getElementById("rfidUIHeader").style.color = rfidUIHeaderColor
            rfidUIHeader = "Failed!"
            document.getElementById("rfidUIHeader").innerHTML = rfidUIHeader
            rfidDescription = "Place your phone on top of the NFC tag"
            document.getElementById("rfidDescription").innerHTML = rfidDescription
            rfidProgress = -1
            document.getElementById("rfidProgress").value = rfidProgress
        }

        function updateRfidUI(results) {
            if (results.code === Enum.eRFID_NotificationAndErrorCodes.RFID_NOTIFICATION_PCSC_READING_DATAGROUP) {
                rfidDescription = Enum.eRFID_DataFile_Type.getTranslation(results.number)
                document.getElementById("rfidDescription").innerHTML = rfidDescription
            }
            rfidUIHeader = "Reading RFID"
            document.getElementById("rfidUIHeader").innerHTML = rfidUIHeader
            rfidUIHeaderColor = "black"
            document.getElementById("rfidUIHeader").style.color = rfidUIHeaderColor
            rfidProgress = results.value
            document.getElementById("rfidProgress").value = rfidProgress
            if (window.cordova.platformId === 'ios')
                DocumentReader.setRfidSessionStatus(rfidDescription + "\n" + results.value + "%", function (e) { }, function (e) { })
        }

        function customRFID() {
            showRfidUI()
            DocumentReader.readRFID(function (m) { handleCompletion(DocumentReader.DocumentReaderCompletion.fromJson(JSON.parse(m))) }, function (e) { })
        }

        function usualRFID() {
            doRfid = false
            DocumentReader.startRFIDReader(function (m) { handleCompletion(DocumentReader.DocumentReaderCompletion.fromJson(JSON.parse(m))) }, function (e) { })
        }

        function handleResults(results) {
            clearResults()
            if (doRfid && results != null && results.chipPage != 0) {
                accessKey = results.getTextFieldValueByType(DocumentReader.Enum.eVisualFieldType.FT_MRZ_STRINGS)
                if (accessKey != null && accessKey != "") {
                    accessKey = accessKey.replace(/^/g, '').replace(/\n/g, '')
                    DocumentReader.setRfidScenario({ mrz: accessKey, pacePasswordType: DocumentReader.Enum.eRFID_Password_Type.PPT_MRZ }, function (m) { }, function (e) { })
                } else {
                    accessKey = results.getTextFieldValueByType(DocumentReader.Enum.eVisualFieldType.FT_CARD_ACCESS_NUMBER)
                    if (accessKey != null && accessKey != "")
                        DocumentReader.setRfidScenario({ password: accessKey, pacePasswordType: DocumentReader.Enum.eRFID_Password_Type.PPT_CAN }, function (m) { }, function (e) { })
                }
                //customRFID()
                usualRFID()
            } else
                displayResults(results)
        }

        function displayResults(results) {
            document.getElementById("status").innerHTML = results.getTextFieldValueByType({ fieldType: Enum.eVisualFieldType.FT_SURNAME_AND_GIVEN_NAMES })
            document.getElementById("status").style.backgroundColor = "green"
            if (results.getGraphicFieldImageByType({ fieldType: Enum.eGraphicFieldType.GF_DOCUMENT_IMAGE }) != null)
                document.getElementById("documentImage").src = "data:image/png;base64," + results.getGraphicFieldImageByType({ fieldType: Enum.eGraphicFieldType.GF_DOCUMENT_IMAGE })
            if (results.getGraphicFieldImageByType({ fieldType: Enum.eGraphicFieldType.GF_PORTRAIT }) != null)
                document.getElementById("portraitImage").src = "data:image/png;base64," + results.getGraphicFieldImageByType({ fieldType: Enum.eGraphicFieldType.GF_PORTRAIT })
        }

        function clearResults() {
            document.getElementById("status").innerHTML = "Ready"
            document.getElementById("documentImage").src = "img/id.png"
            document.getElementById("portraitImage").src = "img/portrait.png"
        }

        function addCertificates() {
            window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/certificates/", function (fileSystem) {
                fileSystem.createReader().readEntries(function (entries) {
                    for (var i in entries) {
                        var item = entries[i]
                        if (item.isFile) {
                            var findExt = item.name.split('.')
                            var pkdResourceType = 0
                            if (findExt.length > 0)
                                pkdResourceType = Enum.PKDResourceType.getType(findExt[findExt.length - 1].toLowerCase())
                            readFile("www/certificates/" + item.name, function (file, resType) {
                                resType = resType[0]
                                var certificates = []
                                certificates.push({
                                    'binaryData': file,
                                    'resourceType': resType
                                })
                                DocumentReader.addPKDCertificates(certificates, function (s) {
                                    console.log("certificate added")
                                }, function (e) { console.log(e) })
                            }, pkdResourceType)
                        }
                    }
                }, function (err) { console.log(err) })
            }, function (err) { console.log(err) })
        }

        function readFile(path, callback, ...items) {
            if (path.substring(0, 8) !== "file:///")
                path = cordova.file.applicationDirectory + path
            window.resolveLocalFileSystemURL(path, function (fileEntry) {
                fileEntry.file(function (file) {
                    var reader = new FileReader()
                    reader.onloadend = function (e) {
                        callback(this.result.substring(this.result.indexOf(',') + 1), items)
                    }
                    reader.readAsDataURL(file)
                })
            }, function (e) { console.log(JSON.stringify(e)) })
        }

        readFile("www/regula.license", function (license) {
            DocumentReader.prepareDatabase("Full", function (message) {
                if (message != "database prepared")
                    document.getElementById("status").innerHTML = "Downloading database: " + message + "%"
                else {
                    document.getElementById("status").innerHTML = "Loading......"
                    DocumentReader.initializeReader(license, function (message) {
                        document.getElementById("status").innerHTML = "Ready"
                        document.getElementById("status").style.backgroundColor = "green"
                        document.getElementById("showScannerButton").addEventListener("click", scan)
                        if (window.cordova.platformId == "android")
                            document.getElementById("showImagePicker").addEventListener("click", recognizeAndroid)
                        if (window.cordova.platformId == "ios")
                            document.getElementById("showImagePicker").addEventListener("click", recognize)
                        DocumentReader.setConfig({
                            functionality: {
                                videoCaptureMotionControl: true,
                                showCaptureButton: true
                            }, customization: {
                                showResultStatusMessages: true,
                                showStatusMessages: true
                            }, processParams: {
                                scenario: "Mrz",
                                doRfid: false,
                            },
                        }, function (m) { }, function (e) { })
                        DocumentReader.getAvailableScenarios(function (s) {
                            DocumentReader.isRFIDAvailableForUse(function (r) { postInitialize(JSON.parse(s), r) }, function (e) { })
                        }, function (e) { })
                        addCertificates()
                    }, function (error) {
                        console.log(error)
                        document.getElementById("status").innerHTML = error
                        document.getElementById("status").style.backgroundColor = "red"
                    })
                }
            }, function (e) { console.log(e) })
        })
    },

    receivedEvent: function (id) {
        var parentElement = document.getElementById(id)
        var listeningElement = parentElement.querySelector('.listening')
        var receivedElement = parentElement.querySelector('.received')
        listeningElement.setAttribute('style', 'display:none;')
        receivedElement.setAttribute('style', 'display:block;')
        console.log('Received Event: ' + id)
    },
}

app.initialize()