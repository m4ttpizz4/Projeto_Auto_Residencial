import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  TextInput,
  Modal,
  Button,
} from 'react-native';

export default function HomeAutomationApp() {
  //Estados para os dispositivos:
  const [livingRoomLight, setLivingRoomLight] = useState(false);
  const [kitchenLight, setKitchenLight] = useState(false);
  const [bedroomLight, setBedroomLight] = useState(false);
  const [acOn, setAcOn] = useState(false);
  const [temperature, setTemperature] = useState(22);
  const [securityActive, setSecurityActive] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);
  
  //Estados para gerenciar cenários personalizados:
  const [customScenarios, setCustomScenarios] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newScenarioName, setNewScenarioName] = useState('');
  const [newScenarioSettings, setNewScenarioSettings] = useState({
    livingRoomLight: false,
    kitchenLight: false,
    bedroomLight: false,
    acOn: false,
    temperature: 22,
    securityActive: false,
  });

  //Cenários pré-definidos:
  const predefinedScenarios = {
    morning: {
      name: 'Manhã',
      actions: () => {
        setLivingRoomLight(true);
        setKitchenLight(true);
        setBedroomLight(false);
        setAcOn(false);
        setSecurityActive(false);
        setSelectedScenario('morning');
      },
    },
    night: {
      name: 'Noite',
      actions: () => {
        setLivingRoomLight(true);
        setKitchenLight(false);
        setBedroomLight(true);
        setAcOn(true);
        setTemperature(24);
        setSecurityActive(true);
        setSelectedScenario('night');
      },
    },
    away: {
      name: 'Fora de casa',
      actions: () => {
        setLivingRoomLight(false);
        setKitchenLight(false);
        setBedroomLight(false);
        setAcOn(false);
        setSecurityActive(true);
        setSelectedScenario('away');
      },
    },
  };

  const toggleSecurity = () => {
    setSecurityActive(!securityActive);
  };

  const openNewScenarioModal = () => {
    setNewScenarioSettings({
      livingRoomLight,
      kitchenLight,
      bedroomLight,
      acOn,
      temperature,
      securityActive,
    });
    setModalVisible(true);
  };

  const saveCustomScenario = () => {
    if (!newScenarioName.trim()) return;
    
    const scenarioKey = `custom_${Date.now()}`;
    
    const newScenario = {
      name: newScenarioName,
      actions: () => {
        setLivingRoomLight(newScenarioSettings.livingRoomLight);
        setKitchenLight(newScenarioSettings.kitchenLight);
        setBedroomLight(newScenarioSettings.bedroomLight);
        setAcOn(newScenarioSettings.acOn);
        setTemperature(newScenarioSettings.temperature);
        setSecurityActive(newScenarioSettings.securityActive);
        setSelectedScenario(scenarioKey);
      },
    };
    
    setCustomScenarios(prev => ({
      ...prev,
      [scenarioKey]: newScenario
    }));
    
    setNewScenarioName('');
    setModalVisible(false);
  };

  const deleteCustomScenario = (key) => {
    const newScenarios = {...customScenarios};
    delete newScenarios[key];
    setCustomScenarios(newScenarios);
    if (selectedScenario === key) {
      setSelectedScenario(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Casa Inteligente</Text>
        <Text style={styles.subtitle}>Bem-vindo de volta!</Text>
      </View>

      //Seção de Iluminação:
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Iluminação</Text>

        <View style={styles.deviceRow}>
          <Text>Sala de Estar</Text>
          <Switch value={livingRoomLight} onValueChange={setLivingRoomLight} />
        </View>

        <View style={styles.deviceRow}>
          <Text>Cozinha</Text>
          <Switch value={kitchenLight} onValueChange={setKitchenLight} />
        </View>

        <View style={styles.deviceRow}>
          <Text>Quarto</Text>
          <Switch value={bedroomLight} onValueChange={setBedroomLight} />
        </View>
      </View>

      //Seção de Climatização:
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Climatização</Text>

        <View style={styles.deviceRow}>
          <Text>Ar Condicionado</Text>
          <Switch value={acOn} onValueChange={setAcOn} />
        </View>

        {acOn && (
          <View style={styles.temperatureControl}>
            <Text>Temperatura: {temperature}°C</Text>
            <View style={styles.temperatureButtons}>
              <TouchableOpacity
                style={styles.tempButton}
                onPress={() => setTemperature((t) => Math.min(30, t + 1))}>
                <Text>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tempButton}
                onPress={() => setTemperature((t) => Math.max(16, t - 1))}>
                <Text>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      //Seção de Segurança:
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fechaduras</Text>

        <TouchableOpacity
          style={[
            styles.securityButton,
            securityActive ? styles.securityActive : styles.securityInactive,
          ]}
          onPress={toggleSecurity}>
          <Text style={styles.securityButtonText}>
            {securityActive ? 'Trancadas' : 'Destrancadas'}
          </Text>
          <Text style={styles.securityButtonSubtext}>
            {securityActive ? 'Toque para destrancar' : 'Toque para trancar'}
          </Text>
        </TouchableOpacity>
      </View>

      //Seção de Cenários
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cenários</Text>

        <View style={styles.scenarioButtons}>
          {Object.keys(predefinedScenarios).map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.scenarioButton,
                selectedScenario === key && styles.scenarioButtonActive,
              ]}
              onPress={() => {
                predefinedScenarios[key].actions();
              }}>
              <Text>{predefinedScenarios[key].name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        //Cenários personalizados:
        {Object.keys(customScenarios).length > 0 && (
          <View style={styles.customScenariosContainer}>
            <Text style={styles.subsectionTitle}>Seus Cenários</Text>
            <View style={styles.scenarioButtons}>
              {Object.keys(customScenarios).map((key) => (
                <View key={key} style={styles.customScenarioItem}>
                  <TouchableOpacity
                    style={[
                      styles.scenarioButton,
                      selectedScenario === key && styles.scenarioButtonActive,
                      { flex: 1 }
                    ]}
                    onPress={() => {
                      customScenarios[key].actions();
                    }}>
                    <Text>{customScenarios[key].name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteCustomScenario(key)}>
                    <Text style={styles.deleteButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.addScenarioButton}
          onPress={openNewScenarioModal}>
          <Text style={styles.addScenarioButtonText}>+ Criar Novo Cenário</Text>
        </TouchableOpacity>
      </View>

      //Criar novo cenário:
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Criar Novo Cenário</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nome do cenário"
            value={newScenarioName}
            onChangeText={setNewScenarioName}
          />
          
          <Text style={styles.settingsTitle}>Configurações Atuais:</Text>
          
          <View style={styles.settingRow}>
            <Text>Sala de Estar</Text>
            <Switch 
              value={newScenarioSettings.livingRoomLight} 
              onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, livingRoomLight: value})} 
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text>Cozinha</Text>
            <Switch 
              value={newScenarioSettings.kitchenLight} 
              onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, kitchenLight: value})} 
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text>Quarto</Text>
            <Switch 
              value={newScenarioSettings.bedroomLight} 
              onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, bedroomLight: value})} 
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text>Ar Condicionado</Text>
            <Switch 
              value={newScenarioSettings.acOn} 
              onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, acOn: value})} 
            />
          </View>
          
          {newScenarioSettings.acOn && (
            <View style={styles.temperatureSetting}>
              <Text>Temperatura: {newScenarioSettings.temperature}°C</Text>
              <View style={styles.temperatureButtons}>
                <TouchableOpacity
                  style={styles.tempButton}
                  onPress={() => setNewScenarioSettings({
                    ...newScenarioSettings,
                    temperature: Math.min(30, newScenarioSettings.temperature + 1)
                  })}>
                  <Text>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.tempButton}
                  onPress={() => setNewScenarioSettings({
                    ...newScenarioSettings,
                    temperature: Math.max(16, newScenarioSettings.temperature - 1)
                  })}>
                  <Text>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          <View style={styles.settingRow}>
            <Text>Sistema de Segurança</Text>
            <Switch 
              value={newScenarioSettings.securityActive} 
              onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, securityActive: value})} 
            />
          </View>
          
          <View style={styles.modalButtons}>
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            <Button title="Salvar" onPress={saveCustomScenario} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#444',
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
    color: '#555',
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  temperatureControl: {
    marginTop: 10,
    alignItems: 'center',
  },
  temperatureButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tempButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  securityButton: {
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  securityActive: {
    backgroundColor: '#4CAF50',
  },
  securityInactive: {
    backgroundColor: '#F44336',
  },
  securityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  securityButtonSubtext: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
  },
  scenarioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  scenarioButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    flex: 1,
    margin: 4,
    alignItems: 'center',
    minWidth: '30%',
  },
  scenarioButtonActive: {
    backgroundColor: '#2196F3',
  },
  customScenariosContainer: {
    marginTop: 12,
  },
  customScenarioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 4,
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#F44336',
  },
  addScenarioButton: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  addScenarioButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  temperatureSetting: {
    marginVertical: 10,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
