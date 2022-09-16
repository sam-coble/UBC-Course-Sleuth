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

export default function CourseItem({courseInfo, variant}) {
	// const [courseInfo, setCourseInfo] = useState({});
	const [showExpandedInfo, setShowExpandedInfo] = useState(!!variant);

	useEffect(() => {
		// fetch course info?

		// setCourseInfo(props.courseInfo);
		return () => {

		}
	}, []);


	function goToCourseInfoScreen() {

	}

	return (
		<TouchableOpacity
			style={{flex:1, flexDirection:'column', width:'100%', height:'30%'}}
			onPress={goToCourseInfoScreen()}
		>
			<View style={styles.container}>
				<TouchableOpacity 
					style={styles.expandButton}
					onPress={() => setShowExpandedInfo(!showExpandedInfo)}>
					<Text style={{textAlign: 'center'}}>
						{showExpandedInfo ? 'v' : '>'}
					</Text>
				</TouchableOpacity>
				<View style={styles.bodygraphdescription}>
					<View style={styles.bodyandgraph}>
						<View style="body">
							<Text style="title">
								{courseInfo.title}
							</Text>
							<View style={styles.starContainer}>
								{
									[...new Array(courseInfo.starCount)].map(e => 
										<Text>
											*
										</Text>)
								}
							</View>
							<View style={styles.averageContainer}>
								<Text>
									{`Meidan: ${courseInfo.median}, IQR: ${courseInfo.iqr}`}
								</Text>
							</View>
						</View>
						<View style={styles.sectionTimeGraphicContainer}>
							{/*TODO: GRAPHIC*/}
							<Text>
								📊
							</Text>
						</View>
					</View>
					<View style={[styles.description, {flex:(showExpandedInfo?1:0)}]}>
					{
						showExpandedInfo && 
						<View>
							<Text>
								{courseInfo.description}
							</Text>
						</View>
					}
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	'container': {
		flex:1,
		flexDirection:"row",
		backgroundColor: 'gray',
		padding:10,
		margin:10,
	},
	'expandButton': {
		flex:1,
		backgroundColor: 'blue',
	},
	'body': {
		flex:6,
		flexDirection: 'column',
		backgroundColor: 'red',
	},
	'title': {
		flex:1,
		backgroundColor: 'green',
	},
	'starContainer': {
		flex:1,
		flexDirection: 'row',
	},
	'averageContainer': {
		flex:1,
	},
	'sectionTimeGraphicContainer': {
		flex: 1,
		backgroundColor: 'orange',
	},
	'description': {

	},
	'bodyandgraph': {
		flex:1,
		flexDirection: 'row'
	},
	'bodygraphdescription': {
		flex:7,
		flexDirection: 'column',
	},
});