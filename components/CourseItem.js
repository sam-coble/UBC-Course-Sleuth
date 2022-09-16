import React, {
	Component,
	useState,
	useEffect,
} from 'react';

import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';

export default function CourseItem(props) {
	
	const [courseInfo, setCourseInfo] = useState({});
	const [showExpandedInfo, setShowExpandedInfo] = useState(false);

	useEffect(() => {
		// fetch course info?

		// setCourseInfo(props);
		return () => {

		}
	}, []);


	function goToCourseInfoScreen() {
		
	}

	return (
		<TouchableOpacity
			style="container"
			onPress={goToCourseInfoScreen()}
		>
			<View>
				<TouchableOpacity 
					style="expandButton"
					onPress={setShowExpandedInfo(!showExpandedInfo)}>
					<Text>
						{showExpandedInfo ? 'v' : '>'}
					</Text>
				</TouchableOpacity>
				<View style="body">
					<Text style="title">
						{courseInfo.title}
					</Text>
					<View style="starContainer">
						{
							<Text>
								hi
							</Text>
						}
					</View>
					<View style="averageContainer">
						<Text>
							{`Meidan: ${courseInfo.median}, IQR: ${courseInfo.iqr}`}
						</Text>
					</View>
				</View>
				<View style="sectionTimeGraphicContainer">
					{/*TODO: GRAPHIC*/}
					<Text>
						📊
					</Text>
				</View>
			</View>
			<View>
			{
				showExpandedInfo && 
				<View>
					<Text>
						{courseInfo.description}
					</Text>
				</View>
			}
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	'container': {

	},
	'expandButton': {

	},
	'body': {

	},
	'title': {

	}
});