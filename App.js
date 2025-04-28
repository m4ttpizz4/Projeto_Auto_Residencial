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
  StatusBar,
  SafeAreaView
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
      paddingTop: StatusBar.currentHeight,
    },
    header: {
      marginBottom: 24,
      paddingHorizontal: 16,
      paddingTop: 16,
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
      marginHorizontal: 16,
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
      marginHorizontal: 16,
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
      <View style={[dynamicStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Image source={require('./logo.png')} style={{ width: 150, height: 150, marginBottom: 20 }} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Casa Inteligente</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView>
        <View style={dynamicStyles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={dynamicStyles.title}>Casa Inteligente</Text>
              <Text style={dynamicStyles.subtitle}>Bem-vindo de volta!</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            />
          </View>
          <View style={dynamicStyles.deviceRow}>
            <Text style={dynamicStyles.text}>Cozinha</Text>
            <Switch 
              value={kitchenLight} 
              onValueChange={setKitchenLight} 
            />
          </View>
          <View style={dynamicStyles.deviceRow}>
            <Text style={dynamicStyles.text}>Quarto</Text>
            <Switch 
              value={bedroomLight} 
              onValueChange={setBedroomLight} 
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
            />
          </View>
          {acOn && (
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={dynamicStyles.text}>Temperatura: {temperature}°C</Text>
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <TouchableOpacity
                  style={[dynamicStyles.scenarioButton, { width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 }]}
                  onPress={() => setTemperature(t => Math.min(30, t + 1))}>
                  <Text style={dynamicStyles.text}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[dynamicStyles.scenarioButton, { width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 }]}
                  onPress={() => setTemperature(t => Math.max(16, t - 1))}>
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
              { padding: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
              securityActive ? { backgroundColor: '#4CAF50' } : { backgroundColor: '#F44336' }
            ]}
            onPress={toggleSecurity}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              {securityActive ? 'Trancadas' : 'Destrancadas'}
            </Text>
            <Text style={{ color: 'white', fontSize: 12, opacity: 0.8 }}>
              {securityActive ? 'Toque para destrancar' : 'Toque para trancar'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Cenários</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {Object.keys(predefinedScenarios).map((key) => (
              <TouchableOpacity
                key={key}
                style={[
                  dynamicStyles.scenarioButton,
                  selectedScenario === key && dynamicStyles.scenarioButtonActive,
                ]}
                onPress={() => predefinedScenarios[key].actions()}>
                <Text style={dynamicStyles.text}>{predefinedScenarios[key].name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {Object.keys(customScenarios).length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={dynamicStyles.subsectionTitle}>Seus Cenários</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                {Object.keys(customScenarios).map((key) => (
                  <View key={key} style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity
                      style={[
                        dynamicStyles.scenarioButton,
                        selectedScenario === key && dynamicStyles.scenarioButtonActive,
                        { flex: 1 }
                      ]}
                      onPress={() => customScenarios[key].actions()}>
                      <Text style={dynamicStyles.text}>{customScenarios[key].name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ padding: 8, marginLeft: 4 }}
                      onPress={() => deleteCustomScenario(key)}>
                      <Text style={{ fontSize: 20, color: '#F44336' }}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          <TouchableOpacity
            style={dynamicStyles.addScenarioButton}
            onPress={openNewScenarioModal}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Criar Novo Cenário</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={[dynamicStyles.container, { padding: 20 }]}>
            <Text style={[dynamicStyles.title, { textAlign: 'center', marginBottom: 20 }]}>Criar Novo Cenário</Text>
            
            <TextInput
              style={dynamicStyles.input}
              placeholder="Nome do cenário"
              placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
              value={newScenarioName}
              onChangeText={setNewScenarioName}
            />
            
            <Text style={[dynamicStyles.sectionTitle, { marginBottom: 12 }]}>Configurações Atuais:</Text>
            
            <View style={dynamicStyles.settingRow}>
              <Text style={dynamicStyles.text}>Sala de Estar</Text>
              <Switch 
                value={newScenarioSettings.livingRoomLight} 
                onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, livingRoomLight: value})}
              />
            </View>
            
            <View style={dynamicStyles.settingRow}>
              <Text style={dynamicStyles.text}>Cozinha</Text>
              <Switch 
                value={newScenarioSettings.kitchenLight} 
                onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, kitchenLight: value})}
              />
            </View>
            
            <View style={dynamicStyles.settingRow}>
              <Text style={dynamicStyles.text}>Quarto</Text>
              <Switch 
                value={newScenarioSettings.bedroomLight} 
                onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, bedroomLight: value})}
              />
            </View>
            
            <View style={dynamicStyles.settingRow}>
              <Text style={dynamicStyles.text}>Ar Condicionado</Text>
              <Switch 
                value={newScenarioSettings.acOn} 
                onValueChange={(value) => setNewScenarioSettings({...newScenarioSettings, acOn: value})}
              />
            </View>
            
            {newScenarioSettings.acOn && (
              <View style={{ marginVertical: 10, alignItems: 'center' }}>
                <Text style={dynamicStyles.text}>Temperatura: {newScenarioSettings.temperature}°C</Text>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <TouchableOpacity
                    style={[dynamicStyles.scenarioButton, { width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 }]}
                    onPress={() => setNewScenarioSettings({
                      ...newScenarioSettings,
                      temperature: Math.min(30, newScenarioSettings.temperature + 1)
                    })}>
                    <Text style={dynamicStyles.text}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[dynamicStyles.scenarioButton, { width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 }]}
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
              />
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
              <Button 
                title="Cancelar" 
                onPress={() => setModalVisible(false)} 
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
    </SafeAreaView>
  );
};

export default HomeAutomationApp;
