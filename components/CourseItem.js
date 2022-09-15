import React, {
	Component,
	useState,
	useEffect,
} from 'react';

import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

export default function CourseItem(props) {
	
	const [courseInfo, setCourseInfo] = useState({});

	useEffect(() => {
		// fetch course info?


		return () => {

		}
	}, []);

	return (
		<View style={styles.view}>
			<Text>
				{`${courseInfo.dept} ${courseInfo.courseCode}: ${courseInfo.title}`}
			</Text>
			<Text>
				{courseInfo.description}
			</Text>
			<View style={styles.starContainer}>
				{
					new Array(courseInfo.starcont).map(e => {
						return <Text>*</Text>
					})
				}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	'view': {

	},
	'starContainer': {

	},
});