import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Pressable,
  StyleSheet, ScrollView, TouchableOpacity, Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';

export default function TransactionScreen() {

  // Variables
  // * * * * * * * * * * * * 
  const { t } = useTranslation();
  const route = useRoute();
  let { geminiResponse = "" } = route.params || {};
  const [transactions, setTransactions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  // Model
  // * * * * * * * * * * * * 

  const processGeminiResponse = () => {
    if (geminiResponse !== "") {
      try {
        const cleaned = geminiResponse.replace(/```|json/g, "").trim();
        const parsed = JSON.parse(cleaned);
        const mapped = parsed.map(item => ({
          name: item.name,
          term: item.term,
          amount: item.amount,
          category: item.category
        }));
        setTransactions(mapped);
        
        
      } catch (error) {
        console.error("Fehler beim Parsen:", error);
      }
    } else {
      setTransactions([]);
    }
  };

  useEffect(() => {
    processGeminiResponse();
  }, [geminiResponse]);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const addTransaction = () => {
    setTransactions(prev => [{ name: '', term: '', amount: ''}, ...prev]);
  };

  const total = transactions
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0)
    .toFixed(2);


  // View
  // * * * * * * * * * * * *   
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Bezeichnung</Text>
      <Pressable style={styles.inputWithIcon}>
        <TextInput
          placeholder="z. B. Einkauf Netto"
          style={styles.textInput}
        />
        <Ionicons name="chevron-forward" size={20} />
      </Pressable>

      <Text style={styles.label}>Datum</Text>
      <Pressable
        style={styles.inputWithIcon}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{date.toLocaleDateString('de-DE')}</Text>
        <Ionicons name="chevron-forward" size={20} />
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onChangeDate}
        />
      )}

      <Text style={styles.label}>Optionale Notiz</Text>
      <TextInput
        placeholder="z. B. privat, geschäftlich, dringend"
        style={styles.noteInput}
        multiline
      />

      <Text style={styles.sectionLabel}>Gesamtbetrag</Text>
      <Text style={styles.totalAmount}>{total}€</Text>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          Bestätigen
        </Text>
      </TouchableOpacity>

      <View style={styles.transactionListHeader}>
        <Text style={styles.label}>Einzelposten</Text>
        <TouchableOpacity onPress={addTransaction}>
          <Ionicons name="add-circle-outline" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {transactions.map((t, index) => (
        <View key={index} style={styles.transactionCard}>
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => {
              const updated = transactions.filter((_, i) => i !== index);
              setTransactions(updated);
            }}>
              <Ionicons name="trash-outline" size={24} color="#cc0000" />
            </TouchableOpacity>
          </View>

          {/* Name (name from scan) */}
          {t.name !== '' && (
            <Text style={styles.scanText}>{t.name}</Text>
          )}

          {/* Amount */}
          <View style={styles.row}>
            <TextInput
              style={[styles.flexInput, { marginRight: 4, textAlign: "right" }]}
              placeholder="0.00"
              keyboardType="numeric"
              value={String(t.amount)}
              onChangeText={(text) => {
                const updated = [...transactions];
                updated[index].amount = text;
                setTransactions(updated);
              }}
            />
            <Text style={{ fontSize: 16, marginLeft: 4 }}>€</Text>
          </View>

          {/* Term (Dictionary) */}
          <TextInput
            style={styles.termInput}
            placeholder="Bezeichnung"
            value={t.term}
            onChangeText={(text) => {
              const updated = [...transactions];
              updated[index].term = text;
              setTransactions(updated);
            }}
          />

          {/* Kategorie */}
          <TextInput
            style={styles.termInput}
            placeholder="Kategorie"
            value={t.category || ''}
            onChangeText={(text) => {
              const updated = [...transactions];
              updated[index].category = text;
              setTransactions(updated);
            }}
          />
        </View>
      ))}

      {/* Platzhalter für Space nach unten */}
      <View style={{ height: 300 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#e6f0ff'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 14,
  },
  inputWithIcon: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
  },
  noteInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    marginTop: 6,
    height: 60,
    textAlignVertical: 'top',
  },
  sectionLabel: {
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 6,
    textAlign: 'center',
  },
  totalAmount: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  transactionListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  transactionCard: {
    backgroundColor: 'white',
    rowGap: 12,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative'
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flexInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    flex: 1,
  },
  scanText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    marginBottom: 6,
    textAlign: 'center',
  },
  termInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  }
});
