import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Image } from 'react-native';

export default function HomeAutomationApp() {
  // Estados para os dispositivos
  const [livingRoomLight, setLivingRoomLight] = useState(false);
  const [kitchenLight, setKitchenLight] = useState(false);
  const [bedroomLight, setBedroomLight] = useState(false);
  const [acOn, setAcOn] = useState(false);
  const [temperature, setTemperature] = useState(22);
  const [securityActive, setSecurityActive] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);

  // Cenários pré-definidos
  const scenarios = {
    morning: {
      name: 'Manhã',
      actions: () => {
        setLivingRoomLight(true);
        setKitchenLight(true);
        setBedroomLight(false);
        setAcOn(false);
        setSecurityActive(false);
      }
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
      }
    },
    away: {
      name: 'Fora de casa',
      actions: () => {
        setLivingRoomLight(false);
        setKitchenLight(false);
        setBedroomLight(false);
        setAcOn(false);
        setSecurityActive(true);
      }
    }
  };

  const toggleSecurity = () => {
    setSecurityActive(!securityActive);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Casa Inteligente</Text>
        <Text style={styles.subtitle}>Bem-vindo de volta!</Text>
      </View>

      {/* Seção de Iluminação */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Iluminação</Text>
        
        <View style={styles.deviceRow}>
          <Text>Sala de Estar</Text>
          <Switch
            value={livingRoomLight}
            onValueChange={setLivingRoomLight}
          />
        </View>
        
        <View style={styles.deviceRow}>
          <Text>Cozinha</Text>
          <Switch
            value={kitchenLight}
            onValueChange={setKitchenLight}
          />
        </View>
        
        <View style={styles.deviceRow}>
          <Text>Quarto</Text>
          <Switch
            value={bedroomLight}
            onValueChange={setBedroomLight}
          />
        </View>
      </View>

      {/* Seção de Climatização */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Climatização</Text>
        
        <View style={styles.deviceRow}>
          <Text>Ar Condicionado</Text>
          <Switch
            value={acOn}
            onValueChange={setAcOn}
          />
        </View>
        
        {acOn && (
          <View style={styles.temperatureControl}>
            <Text>Temperatura: {temperature}°C</Text>
            <View style={styles.temperatureButtons}>
              <TouchableOpacity 
                style={styles.tempButton}
                onPress={() => setTemperature(t => Math.min(30, t + 1))}
              >
                <Text>+</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.tempButton}
                onPress={() => setTemperature(t => Math.max(16, t - 1))}
              >
                <Text>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Seção de Segurança */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Segurança</Text>
        
        <TouchableOpacity 
          style={[
            styles.securityButton,
            securityActive ? styles.securityActive : styles.securityInactive
          ]}
          onPress={toggleSecurity}
        >
          <Text style={styles.securityButtonText}>
            {securityActive ? 'Sistema Ativo' : 'Sistema Inativo'}
          </Text>
          <Text style={styles.securityButtonSubtext}>
            {securityActive ? 'Toque para desativar' : 'Toque para ativar'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.cameraPreview}>
          <Image 
            source={{uri: 'https://placehold.co/600x400?text=Câmera+de+Segurança'}} 
            style={styles.cameraImage}
          />
        </View>
      </View>

      {/* Seção de Cenários */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cenários</Text>
        
        <View style={styles.scenarioButtons}>
          {Object.keys(scenarios).map(key => (
            <TouchableOpacity 
              key={key}
              style={[
                styles.scenarioButton,
                selectedScenario === key && styles.scenarioButtonActive
              ]}
              onPress={() => {
                scenarios[key].actions();
                setSelectedScenario(key);
              }}
            >
              <Text>{scenarios[key].name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
  cameraPreview: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cameraImage: {
    width: '100%',
    height: '100%',
  },
  scenarioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scenarioButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  scenarioButtonActive: {
    backgroundColor: '#2196F3',
  },
});