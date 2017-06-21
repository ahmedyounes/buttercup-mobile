import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
import {
    List,
    ListItem
} from "react-native-elements";
import PropTypes from "prop-types";
import Prompt from "react-native-prompt";

const ARCHIVE_IMAGE_PENDING = require("../../resources/images/pending-256.png");
const ARCHIVE_IMAGE_LOCKED = require("../../resources/images/locked-256.png");
const ARCHIVE_IMAGE_UNLOCKED = require("../../resources/images/unlocked-256.png");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "transparent",
        paddingTop: 30
    },
    archivesList: {
        marginBottom: 20,
        width: "100%"
    }
});

class ArchivesList extends Component {

    handleArchiveSelection(sourceID, status) {
        if (status === "unlocked") {
            this.props.selectArchiveSource(sourceID);
        } else if (status === "locked") {
            // unlock
        } else {
            alert("Uhh.. seems that's not working right now :(");
        }
    }

    render() {
        return (
            <View>
                <List style={styles.archivesList}>
                    {this.props.archives.map(archive => this.renderListItem(archive))}
                </List>
                <Prompt
                    title="Archive Password"
                    placeholder=""
                    visible={false}
                    onCancel={() => this.props.cancelNewPrompt()}
                    onSubmit={value => this.props.onNewMasterPassword(value)}
                    textInputProps={{ secureTextEntry: true }}
                    />
            </View>
        );
    }

    renderListItem(archiveInfo) {
        let image = ARCHIVE_IMAGE_PENDING;
        if (archiveInfo.status === "locked") {
            image = ARCHIVE_IMAGE_LOCKED;
        } else if (archiveInfo.status === "unlocked") {
            image = ARCHIVE_IMAGE_UNLOCKED;
        }
        return (
            <ListItem
                key={archiveInfo.id}
                title={archiveInfo.name}
                avatar={image}
                onPress={() => this.handleArchiveSelection(archiveInfo.id, archiveInfo.status)}
                />
        );
    }

}

ArchivesList.propTypes = {
    archives:               PropTypes.arrayOf(PropTypes.object),
    selectArchiveSource:    PropTypes.func.isRequired
};

export default ArchivesList;
