# Example
# sh ./update.sh cordova/cordova-plugin-face-api/ Release  Release + + Beta +
#1) path to module
#2) ios api branch(Beta or Release)
#3) android api branch(Beta or Release)
#4) ios api version
#5) android api version
#6) module branch(beta or release, if beta, module name will be changed to cordova-plugin-face-api-beta in package.json)
#7) module version
Base_path=$1
Branch_ios=$2
Branch_android=$3
Version_ios=$4
Version_android=$5
Destination_type=$6
Cordova_module_version=$7
PODS_URL_RELEASE='https://pods.regulaforensics.com/FaceSDK/'
PODS_URL_BETA='https://pods.regulaforensics.com/FaceSDKBeta/'
MAVEN_URL_RELEASE='https://maven.regulaforensics.com/RegulaDocumentReader/com/regula/documentreader/facesdk/'
MAVEN_URL_BETA='https://maven.regulaforensics.com/RegulaDocumentReader/Beta/com/regula/documentreader/facesdk/'
if [ "$Branch_ios" == 'Beta' ]; then
    STATE_IOS='Beta'
    URL_IOS=$PODS_URL_BETA
else
	if [ "$Branch_ios" == 'Release' ]; then
		STATE_IOS=''
		URL_IOS=$PODS_URL_RELEASE
	else
		echo "Incorrect ios type(must be Beta or Release)"
        rm -rf "$Base_path/../../cordova-plugin-face-api"
		exit 1
	fi
fi
if [ "$Branch_android" == 'Beta' ]; then
    URL_ANDROID=$MAVEN_URL_BETA
else
	if [ "$Branch_android" == 'Release' ]; then
		URL_ANDROID=$MAVEN_URL_RELEASE
	else
		echo "Incorrect android type(must be Beta or Release)"
        rm -rf "$Base_path/../../cordova-plugin-face-api"
		exit 1
	fi
fi
if [ "$Destination_type" == 'Beta' ]; then
    DEST_TYPE='-beta'
    GITHUB_BRANCH='develop'
else
	if [ "$Destination_type" == 'Release' ]; then
		DEST_TYPE=''
        GITHUB_BRANCH='master'
	else
		echo "Incorrect destination type(must be Beta or Release)"
        rm -rf "$Base_path/../../cordova-plugin-face-api"
		exit 1
	fi
fi 

PKG_NAME="@regulaforensics/cordova-plugin-face-api$DEST_TYPE"
PKG_NAME_CLEAN="cordova-plugin-face-api$DEST_TYPE"
if [ "$Cordova_module_version" == '+' ]; then
	LatestModuleVersion="$(npm view $PKG_NAME version)"
	Cordova_module_version="${LatestModuleVersion%.*}.$((${LatestModuleVersion##*.}+1))"
fi
if [ "$Cordova_module_version" == '.1' ]; then
	Cordova_module_version='0.0.1'
    ModuleIsNew='(new)'
fi
if [ "$Version_ios" == '+' ]; then
    /usr/local/bin/wget -O index.html "$URL_IOS"
    if [[ $? -ne 0 ]]; then
        echo "Failed on wget call for $URL_IOS"
        rm -rf "$Base_path/../../cordova-plugin-face-api"
        exit 1
    fi
    size=$(xmllint --html -xpath "count(//a)" index.html)
    count=$(( size - 2 ))
    v=$(xmllint --html -xpath "//html/body/table/tr[$count]/td[2]/a/text()" index.html)
    Version_ios=${v:0:${#v}-1}
    rm index.html
fi
if [ "$Version_android" == '+' ]; then
    MAVEN_METADATA="$URL_ANDROID/maven-metadata.xml"
    /usr/local/bin/wget -O maven-metadata.xml $MAVEN_METADATA
    if [[ $? -ne 0 ]]; then
        echo "Failed on wget call for $MAVEN_METADATA"
        rm -rf "$Base_path/../../cordova-plugin-face-api"
        exit 1
    fi
    Version_android=$(xmllint --xpath 'string(//metadata/versioning/release)' maven-metadata.xml)
    rm maven-metadata.xml
fi

if ! curl --output /dev/null --silent --head --fail "$URL_ANDROID$Version_android/facesdk-$Version_android.aar"
then
    echo "Invalid URL for android: $URL_ANDROID$Version_android/facesdk-$Version_android.aar"
    rm -rf "$Base_path/../../cordova-plugin-face-api"
    exit 1
fi

sed -i -e "s/ios_branch_place_holder/$STATE_IOS/" "$Base_path/plugin.xml"
sed -i -e "s/version_place_holder/$Version_android/" "$Base_path/src/android/build.gradle"
sed -i -e "s/ios_version_place_holder/$Version_ios/" "$Base_path/plugin.xml"
sed -i -e "s/version_place_holder/$Cordova_module_version/" "$Base_path/plugin.xml"
rm -fr "$Base_path/src/android/build.gradle-e"
rm -fr "$Base_path/plugin.xml-e"

if ! curl --output /dev/null --silent --head --fail "$URL_IOS$Version_ios/FaceSDK$STATE_IOS-$Version_ios.zip"
then
    echo "Invalid URL for ios: $URL_IOS$Version_ios/FaceSDK$STATE_IOS-$Version_ios.zip"
    rm -rf "$Base_path/../../cordova-plugin-face-api"
    exit 1
fi

sed -i -e "s/api_module_place_holder/$PKG_NAME_CLEAN/" "$Base_path/example/package.json"
sed -i -e "s/api_module_place_holder/$PKG_NAME_CLEAN/" "$Base_path/example/package.json"
sed -i -e "s/api_version_place_holder/$Cordova_module_version/" "$Base_path/example/package.json"
rm -fr "$Base_path/example/package.json-e"

cd "$Base_path"
/usr/local/bin/jq --arg PKG_NAME "$PKG_NAME" '.name = $PKG_NAME' package.json > tmp.$$.json && mv tmp.$$.json package.json
/usr/local/bin/jq --arg Cordova_module_version "$Cordova_module_version" '.version = $Cordova_module_version' package.json > tmp.$$.json && mv tmp.$$.json package.json
/usr/local/bin/jq --arg PKG_NAME "$PKG_NAME" '.cordova.id = $PKG_NAME' package.json > tmp.$$.json && mv tmp.$$.json package.json

if /usr/local/bin/npm publish ; then
    echo ''
    echo 'SUCCESS!'
    echo ''
    echo "Android: $Branch_android $Version_android"
    echo "IOS: $Branch_ios $Version_ios"
    echo "Module: $Destination_type $Cordova_module_version$ModuleIsNew"
    echo ''
else
    echo "npm publish failed"
    rm -rf "$Base_path/../../cordova-plugin-face-api"
	exit 1
fi

echo ""
echo "Pushing to github"
echo ""

cd "$Base_path"
cd "../"
git clone --branch "$GITHUB_BRANCH" https://github.com/regulaforensics/cordova-plugin-face-api.git cordova_temp_dir
cp -rf "$Base_path/../cordova_temp_dir/.git" "$Base_path/.git"
rm -rf "$Base_path/../cordova_temp_dir"
mkdir "$Base_path/../cordova_temp_dir"
cp -rf "$Base_path/." "$Base_path/../cordova_temp_dir"

cd "$Base_path/../cordova_temp_dir"
git stage --all
git commit --message "$Cordova_module_version"
if git push ; then
    rm -rf "$Base_path/../cordova_temp_dir"
    echo ""
    echo "SUCCESS!"
    echo ""
else
    echo ""
    echo "Push failed"
    echo "Now plugin version on npmjs.com is higher than on github"
    echo "This may cause a build fail"
    echo "Next successful script run will fix the issue"
    echo ""
    rm -rf "$Base_path/../../cordova-plugin-face-api"
    rm -rf "$Base_path/../cordova_temp_dir"
	exit 1
fi

rm -rf "$Base_path/../cordova_temp_dir"
rm -rf "$Base_path/../../cordova-plugin-face-api"
