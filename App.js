import React, { useState, useEffect } from 'react';
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
  Image,
  Appearance,
  useColorScheme,
} from 'react-native';

const HomeAutomationApp = () => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [splashVisible, setSplashVisible] = useState(true);

  const [livingRoomLight, setLivingRoomLight] = useState(false);
  const [kitchenLight, setKitchenLight] = useState(false);
  const [bedroomLight, setBedroomLight] = useState(false);
  const [acOn, setAcOn] = useState(false);
  const [temperature, setTemperature] = useState(22);
  const [securityActive, setSecurityActive] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);
  
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

  useEffect(() => {

    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
    },
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#333',
    },
    subtitle: {
      fontSize: 16,
      color: isDarkMode ? '#aaa' : '#666',
    },
    section: {
      backgroundColor: isDarkMode ? '#1e1e1e' : 'white',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0 : 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      color: isDarkMode ? '#fff' : '#444',
    },
    subsectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginVertical: 8,
      color: isDarkMode ? '#ccc' : '#555',
    },
    deviceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#333' : '#eee',
    },
    text: {
      color: isDarkMode ? '#fff' : '#000',
    },
    scenarioButton: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#333' : '#eee',
      flex: 1,
      margin: 4,
      alignItems: 'center',
      minWidth: '30%',
    },
    scenarioButtonActive: {
      backgroundColor: '#2196F3',
    },
    addScenarioButton: {
      marginTop: 12,
      padding: 12,
      borderRadius: 8,
      backgroundColor: '#2196F3',
      alignItems: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#333' : '#ddd',
      borderRadius: 6,
      padding: 10,
      marginBottom: 20,
      color: isDarkMode ? '#fff' : '#000',
      backgroundColor: isDarkMode ? '#333' : '#fff',
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#333' : '#eee',
    },
  });

  if (splashVisible) {
    return (
      <View style={[styles.splashContainer, { backgroundColor: isDarkMode ? '#121212' : '#2196F3' }]}>
        <Image 
          source={require('./logo.png')}
          style={styles.logo}
        />
        <Text style={styles.splashText}>Casa Inteligente</Text>
      </View>
    );
  }

  return (
    <ScrollView style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={dynamicStyles.title}>Casa Inteligente</Text>
            <Text style={dynamicStyles.subtitle}>Bem-vindo de volta!</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 8, color: isDarkMode ? '#fff' : '#000' }}>Modo Escuro</Text>
            <Switch 
              value={isDarkMode} 
              onValueChange={toggleDarkMode}
            />
          </View>
        </View>
      </View>

      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Iluminação</Text>

        <View style={dynamicStyles.deviceRow}>
          <Text style={dynamicStyles.text}>Sala de Estar</Text>
          <Switch 
            value={livingRoomLight} 
            onValueChange={setLivingRoomLight} 
            thumbColor={isDarkMode ? '#f5f5f5' : undefined}
          />
        </View>

        <View style={dynamicStyles.deviceRow}>
          <Text style={dynamicStyles.text}>Cozinha</Text>
          <Switch 
            value={kitchenLight} 
            onValueChange={setKitchenLight} 
            thumbColor={isDarkMode ? '#f5f5f5' : undefined}
          />
        </View>

        <View style={dynamicStyles.deviceRow}>
          <Text style={dynamicStyles.text}>Quarto</Text>
          <Switch 
            value={bedroomLight} 
            onValueChange={setBedroomLight} 
            thumbColor={isDarkMode ? '#f5f5f5' : undefined}
          />
        </View>
      </View>

      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Climatização</Text>

        <View style={dynamicStyles.deviceRow}>
          <Text style={dynamicStyles.text}>Ar Condicionado</Text>
          <Switch 
            value={acOn} 
            onValueChange={setAcOn} 
            thumbColor={isDarkMode ? '#f5f5f5' : undefined}
          />
        </View>

        {acOn && (
          <View style={styles.temperatureControl}>
            <Text style={dynamicStyles.text}>Temperatura: {temperature}°C</Text>
            <View style={styles.temperatureButtons}>
              <TouchableOpacity
                style={[styles.tempButton, { backgroundColor: isDarkMode ? '#333' : '#ddd' }]}
                onPress={() => setTemperature((t) => Math.min(30, t + 1))}>
                <Text style={dynamicStyles.text}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tempButton, { backgroundColor: isDarkMode ? '#333' : '#ddd' }]}
                onPress={() => setTemperature((t) => Math.max(16, t - 1))}>
                <Text style={dynamicStyles.text}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Fechaduras</Text>

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

      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Cenários</Text>

        <View style={styles.scenarioButtons}>
          {Object.keys(predefinedScenarios).map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                dynamicStyles.scenarioButton,
                selectedScenario === key && dynamicStyles.scenarioButtonActive,
              ]}
              onPress={() => {
                predefinedScenarios[key].actions();
              }}>
              <Text style={dynamicStyles.text}>{predefinedScenarios[key].name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {Object.keys(customScenarios).length > 0 && (
          <View style={styles.customScenariosContainer}>
            <Text style={dynamicStyles.subsectionTitle}>Seus Cenários</Text>
            <View style={styles.scenarioButtons}>
              {Object.keys(customScenarios).map((key) => (
                <View key={key} style={styles.customScenarioItem}>
                  <TouchableOpacity
                    style={[
                      dynamicStyles.scenarioButton,
                      selectedScenario === key && dynamicStyles.scenarioButtonActive,
                      { flex: 1 }
                    ]}
                    onPress={() => {
                      customScenarios[key].actions();
                    }}>
                    <Text style={dynamicStyles.text}>{customScenarios[key].name}</Text>
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
          style={dynamicStyles.addScenarioButton}
          onPress={openNewScenarioModal}>
          <Text style={styles.addScenarioButtonText}>+ Criar Novo Cenário</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={[styles.modalContainer, { backgroundColor: isDarkMode ? '#121212' : 'white' }]}>
          <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Criar Novo Cenário</Text>
          
          <TextInput
            style={dynamicStyles.input}
            placeholder="Nome do cenário"
            placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
            value={newScenarioName}
            onChangeText={setNewScenarioName}
          />
          
          <Text style={[styles.settingsTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Configurações Atuais:</Text>
          
          <View style={dynamicStyles.settingRow}>
            <Text style={dynamicStyles.text}>Sala de Estar</Text>
            <Switch 
              value={newScenarioSettings.livingRoomLight} 
              onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, livingRoomLight: value})}
              thumbColor={isDarkMode ? '#f5f5f5' : undefined}
            />
          </View>
          
          <View style={dynamicStyles.settingRow}>
            <Text style={dynamicStyles.text}>Cozinha</Text>
            <Switch 
              value={newScenarioSettings.kitchenLight} 
              onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, kitchenLight: value})}
              thumbColor={isDarkMode ? '#f5f5f5' : undefined}
            />
          </View>
          
          <View style={dynamicStyles.settingRow}>
            <Text style={dynamicStyles.text}>Quarto</Text>
            <Switch 
              value={newScenarioSettings.bedroomLight} 
              onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, bedroomLight: value})}
              thumbColor={isDarkMode ? '#f5f5f5' : undefined}
            />
          </View>
          
          <View style={dynamicStyles.settingRow}>
            <Text style={dynamicStyles.text}>Ar Condicionado</Text>
            <Switch 
              value={newScenarioSettings.acOn} 
              onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, acOn: value})}
              thumbColor={isDarkMode ? '#f5f5f5' : undefined}
            />
          </View>
          
          {newScenarioSettings.acOn && (
            <View style={styles.temperatureSetting}>
              <Text style={dynamicStyles.text}>Temperatura: {newScenarioSettings.temperature}°C</Text>
              <View style={styles.temperatureButtons}>
                <TouchableOpacity
                  style={[styles.tempButton, { backgroundColor: isDarkMode ? '#333' : '#ddd' }]}
                  onPress={() => setNewScenarioSettings({
                    ...newScenarioSettings,
                    temperature: Math.min(30, newScenarioSettings.temperature + 1)
                  })}>
                  <Text style={dynamicStyles.text}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tempButton, { backgroundColor: isDarkMode ? '#333' : '#ddd' }]}
                  onPress={() => setNewScenarioSettings({
                    ...newScenarioSettings,
                    temperature: Math.max(16, newScenarioSettings.temperature - 1)
                  })}>
                  <Text style={dynamicStyles.text}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          <View style={dynamicStyles.settingRow}>
            <Text style={dynamicStyles.text}>Sistema de Segurança</Text>
            <Switch 
              value={newScenarioSettings.securityActive} 
              onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, securityActive: value})}
              thumbColor={isDarkMode ? '#f5f5f5' : undefined}
            />
          </View>
          
          <View style={styles.modalButtons}>
            <Button 
              title="Cancelar" 
              onPress={() => setModalVisible(false)} 
              color={isDarkMode ? '#666' : undefined}
            />
            <Button 
              title="Salvar" 
              onPress={saveCustomScenario} 
              color="#2196F3"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
  addScenarioButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
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

export default HomeAutomationApp;
